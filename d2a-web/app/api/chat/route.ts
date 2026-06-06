import { getClient, MODEL, ENABLE_WEB_SEARCH, webSearchTool, isToolConfigError } from "@/lib/anthropic";
import { buildChatSystem } from "@/lib/prompts";
import type { ChatMessage } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function POST(req: Request) {
  let messages: ChatMessage[] = [];
  let accountName: string | undefined;
  try {
    const body = await req.json();
    if (Array.isArray(body?.messages)) messages = body.messages;
    if (typeof body?.account === "string") accountName = body.account;
  } catch {
    /* ignore */
  }

  // Keep only well-formed turns; the API requires alternating, non-empty content.
  const clean = messages
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content }));

  if (clean.length === 0) {
    return new Response("ERROR: no message provided", { status: 400 });
  }

  const system = buildChatSystem(accountName);
  const encoder = new TextEncoder();

  const baseParams = {
    model: MODEL,
    max_tokens: 2048,
    system,
    messages: clean,
  };

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (s: string) => controller.enqueue(encoder.encode(s));

      const runOnce = async (withTools: boolean) => {
        const params: Record<string, unknown> = { ...baseParams };
        if (withTools && ENABLE_WEB_SEARCH) params.tools = [webSearchTool(4)];
        const client = getClient();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const s = client.messages.stream(params as any);
        for await (const event of s) {
          if (
            event.type === "content_block_start" &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (event as any).content_block?.type === "server_tool_use"
          ) {
            send("\n_[searching…]_\n");
          } else if (
            event.type === "content_block_delta" &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (event as any).delta?.type === "text_delta"
          ) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            send((event as any).delta.text as string);
          }
        }
      };

      try {
        try {
          await runOnce(true);
        } catch (err) {
          if (ENABLE_WEB_SEARCH && isToolConfigError(err)) {
            await runOnce(false);
          } else {
            throw err;
          }
        }
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
