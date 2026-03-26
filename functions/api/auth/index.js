export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const BASE_URL = `${url.protocol}//${url.host}`;

  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: `${BASE_URL}/api/auth/callback`,
    scope: 'repo,user',
  });

  return Response.redirect(`https://github.com/login/oauth/authorize?${params}`, 302);
}
