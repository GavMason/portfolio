import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { fetchSpotify, type SpotifyData } from '../../data/spotify'

const POLL_INTERVAL = 30_000

export function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData>({ playing: false })
  const [loading, setLoading] = useState(true)
  const reduced = useReducedMotion()
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined)

  const poll = useCallback(async () => {
    const result = await fetchSpotify()
    setData(result)
    setLoading(false)
  }, [])

  useEffect(() => {
    let cancelled = false

    fetchSpotify().then((result) => {
      if (!cancelled) {
        setData(result)
        setLoading(false)
      }
    })

    timerRef.current = setInterval(poll, POLL_INTERVAL)
    return () => {
      cancelled = true
      clearInterval(timerRef.current)
    }
  }, [poll])

  const hasTrack = !!data.track

  // Progress percentage
  const progress =
    data.playing && data.progress && data.duration
      ? (data.progress / data.duration) * 100
      : 0

  if (loading) {
    return (
      <div className="rounded-2xl bg-surface border border-border p-6 h-full flex items-center justify-center">
        <div className="flex items-center gap-3 text-text-dim text-sm">
          <SpotifyIcon className="w-5 h-5 opacity-40" />
          <span>Connecting to Spotify...</span>
        </div>
      </div>
    )
  }

  return (
    <a
      href={data.url ?? 'https://open.spotify.com'}
      target="_blank"
      rel="noopener noreferrer"
      className="group block no-underline rounded-2xl bg-surface border border-border hover:border-[rgba(30,215,96,0.2)] transition-all duration-300 overflow-hidden hover:shadow-[0_8px_30px_rgba(30,215,96,0.08)]"
    >
      <div className="p-5 flex gap-5 items-center">
        {/* Album art / Vinyl */}
        <div className="relative shrink-0 w-18 h-18 md:w-22 md:h-22">
          {hasTrack && data.albumArt ? (
            <>
              {/* Vinyl disc behind album art */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0d0d1a 40%, #1a1a2e 41%, #0d0d1a 60%, #1a1a2e 61%, #111 100%)',
                  transformOrigin: 'center',
                  left: '15%',
                }}
                animate={
                  data.playing && !reduced ? { rotate: 360 } : {}
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              {/* Album art */}
              <div
                className="relative w-full h-full rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${data.albumArt})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </>
          ) : (
            <div className="w-full h-full rounded-xl bg-border flex items-center justify-center">
              <SpotifyIcon className="w-8 h-8 text-text-dim" />
            </div>
          )}
        </div>

        {/* Track info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <SpotifyIcon className="w-3.5 h-3.5 text-[#1DB954] shrink-0" />
            <span className="text-[10px] font-mono tracking-[1.5px] uppercase text-text-dim">
              {data.playing ? 'Now Playing' : hasTrack ? 'Last Played' : 'Spotify'}
            </span>
            {data.playing && <EqBars />}
          </div>

          {hasTrack ? (
            <>
              <p className="text-sm md:text-[15px] font-semibold text-text-primary truncate leading-tight">
                {data.track}
              </p>
              <p className="text-xs md:text-[13px] text-text-muted truncate mt-0.5">
                {data.artist}
              </p>
              <p className="text-[11px] text-text-dim truncate mt-0.5">
                {data.album}
              </p>
            </>
          ) : (
            <p className="text-sm text-text-muted">Nothing playing right now</p>
          )}

          {/* Progress bar */}
          {data.playing && data.duration && (
            <div className="mt-3 h-1 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full bg-[#1DB954] transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </a>
  )
}

/* ── Helpers ──────────────────────────────────────────── */

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}

function EqBars() {
  return (
    <div className="flex items-end gap-0.5 h-3 ml-1">
      {[0, 0.15, 0.3].map((delay) => (
        <span
          key={delay}
          className="w-0.75 rounded-full bg-[#1DB954]"
          style={{
            animation: `eq-bounce 0.8s ease-in-out ${delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  )
}
