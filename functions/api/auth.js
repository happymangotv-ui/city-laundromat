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

  // Step 2: Handle callback
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

    if (!token) {
      return new Response(`Auth failed: ${JSON.stringify(tokenData)}`, { status: 401 });
    }

    const content = JSON.stringify({ token, provider: 'github' });
    const html = `<!DOCTYPE html><html><body><script>
      (function() {
        var content = ${JSON.stringify(content)};
        var msg = 'authorization:github:success:' + content;
        function attempt() {
          if (window.opener) {
            window.opener.postMessage(msg, '*');
            setTimeout(function() { window.close(); }, 1000);
          } else {
            setTimeout(attempt, 100);
          }
        }
        attempt();
      })();
    </script><p>Authenticating...</p></body></html>`;

    return new Response(html, { headers: { 'Content-Type': 'text/html' } });
  }

  return new Response('Not found', { status: 404 });
}
