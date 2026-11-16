import { buildLlmsFullTxt } from "@/lib/llms";

// Generated at build time from the same data as the pages, so facts never drift.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
