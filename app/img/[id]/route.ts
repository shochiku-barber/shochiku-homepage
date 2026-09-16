/** 管理室から上げた写真を配る。/img/<id> */
import { env } from "cloudflare:workers";

export async function GET(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!/^[a-f0-9-]{10,64}$/.test(id)) return new Response("Not found", { status: 404 });

  const kv = (env as unknown as { CONTENT?: KVNamespace }).CONTENT;
  if (!kv) return new Response("Not found", { status: 404 });

  const object = await kv.getWithMetadata<{ type?: string }>(`img:${id}`, { type: "arrayBuffer" });
  if (!object?.value) return new Response("Not found", { status: 404 });

  return new Response(object.value, {
    headers: {
      "content-type": object.metadata?.type || "image/jpeg",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
