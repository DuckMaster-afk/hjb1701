export async function onRequestGet(context) {
  const { env } = context;
  // Get the message from KV, or fallback to a default message if empty
  const message = await env.BULLETIN_KV.get("latest_bulletin") || "# Welcome\nNothing posted yet!";
  
  return new Response(message, {
    headers: { "Content-Type": "text/markdown" }
  });
}
