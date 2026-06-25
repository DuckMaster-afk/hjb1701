export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { password, message } = await request.json();

    // Define standard CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "site.hjb1701.workers.dev",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json"
    };

    if (password !== env.BULLETIN_PASSWORD) {
      return new Response(JSON.stringify({ message: "Access Denied" }), { status: 401, headers: corsHeaders });
    }

    await env.BULLETIN_KV.put("latest_bulletin", message);

    return new Response(JSON.stringify({ message: "Bulletin updated!" }), { status: 200, headers: corsHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Error: " + err.message }), { status: 500 });
  }
}

// You also need to handle the browser's preflight OPTIONS request
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  });
}