import Anthropic from "@anthropic-ai/sdk";

export const MODEL = process.env.MODEL || "claude-sonnet-4-6";
export const ENABLE_WEB_SEARCH = (process.env.ENABLE_WEB_SEARCH || "true") !== "false";
export const WEB_SEARCH_TOOL = process.env.WEB_SEARCH_TOOL || "web_search_20260209";

let _client: Anthropic | null = null;

// Lazily construct the client so a missing key surfaces as a clean runtime
// error (not a module-load crash), and the homepage/build never depend on it.
export function getClient(): Anthropic {
  if (_client) return _client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to .env.local (local dev) or the Vercel project settings.",
    );
  }
  _client = new Anthropic({ apiKey });
  return _client;
}

// The web-search server tool, cast loosely so an updated version string
// doesn't break the build. max_uses bounds latency/cost.
export function webSearchTool(maxUses = 6): unknown {
  return { type: WEB_SEARCH_TOOL, name: "web_search", max_uses: maxUses };
}

// True if an error looks like a rejected/invalid tool configuration,
// so callers can gracefully retry without tools.
export function isToolConfigError(err: unknown): boolean {
  const msg = String((err as { message?: string })?.message ?? err ?? "");
  return /tool|web_search|invalid_request|400/i.test(msg);
}
