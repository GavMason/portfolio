interface Env {
  SPOTIFY_CLIENT_ID: string
  SPOTIFY_CLIENT_SECRET: string
  SPOTIFY_REFRESH_TOKEN: string
}

// Cloudflare Pages Function type
type PagesFunction<E = unknown> = (context: {
  request: Request
  env: E
  params: Record<string, string>
}) => Response | Promise<Response>

interface SpotifyTrack {
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string; width: number }[]
  }
  external_urls: { spotify: string }
  duration_ms: number
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json',
}

async function getAccessToken(env: Env): Promise<string | null> {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`)}`,
    },
    body: 'grant_type=refresh_token&refresh_token=' + encodeURIComponent(env.SPOTIFY_REFRESH_TOKEN),
  })
  if (!res.ok) return null
  const data: { access_token: string } = await res.json()
  return data.access_token
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.SPOTIFY_CLIENT_ID || !env.SPOTIFY_CLIENT_SECRET || !env.SPOTIFY_REFRESH_TOKEN) {
    return new Response(JSON.stringify({ playing: false }), { headers: CORS_HEADERS })
  }

  const token = await getAccessToken(env)
  if (!token) {
    return new Response(JSON.stringify({ playing: false }), { headers: CORS_HEADERS })
  }

  // Try currently playing
  const nowRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (nowRes.status === 200) {
    const data: { is_playing: boolean; item: SpotifyTrack; progress_ms: number } = await nowRes.json()
    if (data.item) {
      return new Response(
        JSON.stringify({
          playing: data.is_playing,
          track: data.item.name,
          artist: data.item.artists.map((a) => a.name).join(', '),
          album: data.item.album.name,
          albumArt: data.item.album.images.find((i) => i.width <= 300)?.url ?? data.item.album.images[0]?.url,
          url: data.item.external_urls.spotify,
          progress: data.progress_ms,
          duration: data.item.duration_ms,
        }),
        { headers: CORS_HEADERS },
      )
    }
  }

  // Fallback to recently played
  const recentRes = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (recentRes.ok) {
    const data: { items: { track: SpotifyTrack; played_at: string }[] } = await recentRes.json()
    const last = data.items?.[0]
    if (last) {
      return new Response(
        JSON.stringify({
          playing: false,
          track: last.track.name,
          artist: last.track.artists.map((a) => a.name).join(', '),
          album: last.track.album.name,
          albumArt: last.track.album.images.find((i) => i.width <= 300)?.url ?? last.track.album.images[0]?.url,
          url: last.track.external_urls.spotify,
          playedAt: last.played_at,
        }),
        { headers: CORS_HEADERS },
      )
    }
  }

  return new Response(JSON.stringify({ playing: false }), { headers: CORS_HEADERS })
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: CORS_HEADERS })
}
