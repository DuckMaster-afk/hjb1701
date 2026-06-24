export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { password, message } = await request.json();

    // 1. Check the password against an environment variable set in Cloudflare
    if (password !== env.BULLETIN_PASSWORD) {
      return new Response(JSON.stringify({ message: "Access Denied" }), { status: 401 });
    }

    // 2. Save the markdown message into Cloudflare KV storage
    // 'BULLETIN_KV' is the name of your KV namespace binding
    await env.BULLETIN_KV.put("latest_bulletin", message);

    return new Response(JSON.stringify({ message: "Bulletin updated!" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Error: " + err.message }), { status: 500 });
  }
}
