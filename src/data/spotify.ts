export interface SpotifyData {
  playing: boolean
  track?: string
  artist?: string
  album?: string
  albumArt?: string
  url?: string
  progress?: number
  duration?: number
  playedAt?: string
}

export async function fetchSpotify(): Promise<SpotifyData> {
  try {
    const res = await fetch('/api/spotify')
    if (!res.ok) return { playing: false }
    return await res.json()
  } catch {
    return { playing: false }
  }
}
