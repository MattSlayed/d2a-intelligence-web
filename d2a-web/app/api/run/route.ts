import { getClient, MODEL, ENABLE_WEB_SEARCH, webSearchTool, isToolConfigError } from "@/lib/anthropic";
import { buildResearchSystem, buildRunSystem } from "@/lib/prompts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Two-pass research + synthesis can take a few minutes. 300s needs a Vercel plan
// that allows it (Pro); Hobby caps lower — see README "Adjusting function duration".
export const maxDuration = 300;

export async function POST(req: Request) {
  let brief = "";
  try {
    const body = await req.json();
    if (typeof body?.brief === "string") brief = body.brief;
  } catch {
    /* empty body is fine */
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (s: string) => controller.enqueue(encoder.encode(s));
      const client = getClient();

      // Stream a single model call; return the concatenated assistant text.
      async function streamCall(system: string, userText: string, withTools: boolean): Promise<string> {
        const params: Record<string, unknown> = {
          model: MODEL,
          max_tokens: 6000,
          system,
          messages: [{ role: "user", content: userText }],
        };
        if (withTools) params.tools = [webSearchTool(15)];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const s = client.messages.stream(params as any);
        let text = "";
        for await (const event of s) {
          if (
            event.type === "content_block_start" &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (event as any).content_block?.type === "server_tool_use"
          ) {
            send("\n[web] searching the open web…\n");
          } else if (
            event.type === "content_block_delta" &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (event as any).delta?.type === "text_delta"
          ) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const t = (event as any).delta.text as string;
            text += t;
            send(t);
          }
        }
        return text;
      }

      try {
        // ── Pass 1: dedicated research agent (web search) ──
        send("## Research agent\n");
        let research = "";
        if (ENABLE_WEB_SEARCH) {
          try {
            research = await streamCall(
              buildResearchSystem(brief),
              "Research the target accounts now, following your brief. Gather grounded, citable findings.",
              true,
            );
          } catch (err) {
            if (isToolConfigError(err)) {
              send("\n[web] live grounding unavailable — researching from prior knowledge.\n");
              research = await streamCall(
                buildResearchSystem(brief),
                "Research the target accounts now, following your brief, drawing on your own knowledge; cite credible real sources.",
                false,
              );
            } else {
              throw err;
            }
          }
        } else {
          research = await streamCall(
            buildResearchSystem(brief),
            "Research the target accounts now, following your brief, drawing on your own knowledge; cite credible real sources.",
            false,
          );
        }

        // ── Pass 2: scoring / synthesis (no tools; consumes the dossier) ──
        send("\n\n## Scoring pipeline\n");
        await streamCall(
          buildRunSystem(brief, { research }),
          "Using the research findings, run the nine-stage pipeline now. Stream each STEP k/9 marker, then emit the final JSON block.",
          false,
        );

        controller.close();
      } catch (err) {
        send("\n\nERROR: " + String((err as { message?: string })?.message ?? err));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
