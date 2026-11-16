import type { SchemaGraph } from "@/lib/schema";

/** Injects a JSON-LD @graph. "<" is escaped so content can never close the script tag. */
export function JsonLd({ schema }: { schema: SchemaGraph }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
