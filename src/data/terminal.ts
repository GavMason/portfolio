export interface TerminalLine {
  prompt: boolean
  text: string
}

export const TERMINAL_LINES: TerminalLine[] = [
  { prompt: true, text: 'cd ~/currently-working-on' },
  { prompt: false, text: '' },
  { prompt: true, text: 'ls -la' },
  { prompt: false, text: 'drwxr-xr-x  mcp-server/' },
  { prompt: false, text: 'drwxr-xr-x  homelab-obs-stack/' },
  { prompt: false, text: '-rw-r--r--  new-ml-tooling.md' },
  { prompt: false, text: '' },
  { prompt: true, text: 'cat status.txt' },
  { prompt: false, text: 'Building, learning, shipping. Always.' },
]
