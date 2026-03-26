// Decap CMS GitHub OAuth handler for Cloudflare Pages Functions

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  const CLIENT_ID = env.GITHUB_CLIENT_ID;
  const CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;
  const BASE_URL = `${url.protocol}//${url.host}`;

  // Step 1: Redirect to GitHub OAuth
  if (path === '/api/auth') {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: `${BASE_URL}/api/auth/callback`,
      scope: 'repo,user',
    });
    return Response.redirect(`https://github.com/login/oauth/authorize?${params}`, 302);
  }

  // Step 2: Handle callback, exchange code for token
  if (path === '/api/auth/callback') {
    const code = url.searchParams.get('code');
    if (!code) return new Response('Missing code', { status: 400 });

    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }),
    });
    const tokenData = await tokenRes.json();
    const token = tokenData.access_token;

    if (!token) return new Response('Auth failed', { status: 401 });

    // Return script that posts token back to Decap CMS opener
    const html = `<!DOCTYPE html><html><body><script>
      (function() {
        function receiveMessage(e) {
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify({ token, provider: 'github' }).replace(/'/g, "\\'")}',
            e.origin
          );
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script></body></html>`;

    return new Response(html, { headers: { 'Content-Type': 'text/html' } });
  }

  return new Response('Not found', { status: 404 });
}
