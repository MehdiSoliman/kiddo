interface Env {
  DIARY_KV: KVNamespace;
  API_TOKEN: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function unauthorized(): Response {
  return new Response('Unauthorized', { status: 401, headers: corsHeaders });
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Verify token
    const auth = request.headers.get('Authorization');
    if (auth !== `Bearer ${env.API_TOKEN}`) {
      return unauthorized();
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // GET /api/entries — list all entries
    if (request.method === 'GET' && path === '/api/entries') {
      const list = await env.DIARY_KV.list();
      const entries: Record<string, unknown> = {};
      for (const key of list.keys) {
        const value = await env.DIARY_KV.get(key.name, 'json');
        if (value) entries[key.name] = value;
      }
      return json(entries);
    }

    // GET /api/entries/:date
    const getMatch = path.match(/^\/api\/entries\/(\d{4}-\d{2}-\d{2})$/);
    if (request.method === 'GET' && getMatch) {
      const value = await env.DIARY_KV.get(getMatch[1], 'json');
      if (!value) return json(null, 404);
      return json(value);
    }

    // PUT /api/entries/:date
    const putMatch = path.match(/^\/api\/entries\/(\d{4}-\d{2}-\d{2})$/);
    if (request.method === 'PUT' && putMatch) {
      const body = await request.json();
      await env.DIARY_KV.put(putMatch[1], JSON.stringify(body));
      return json({ ok: true });
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  },
};
