export function Footer() {
  return (
    <footer className="relative z-3 flex justify-between items-center max-w-250 mx-auto py-6 sm:py-9 px-5 md:px-10 border-t border-border">
      <span className="text-xs text-text-whisper">
        Built by Gav • {new Date().getFullYear()}
      </span>
      <span className="text-[11px] font-mono text-text-ghost">⌘K</span>
    </footer>
  )
}
