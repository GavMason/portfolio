export const HERO_BIO = "I'm a software engineer who got into this because I like making things. These days that means I'm building web apps and ML systems at work, and going down rabbit holes and homelab tinkering after hours."

export function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 5) return "Late night? I'm"
  if (h < 12) return "Good morning, I'm"
  if (h < 17) return "Good afternoon, I'm"
  if (h < 21) return "Good evening, I'm"
  return "Burning the midnight oil? I'm"
}
