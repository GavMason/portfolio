import { Reveal } from '../UI/Reveal'
import { SectionHeader } from '../UI/SectionHeader'
import { Terminal } from './Terminal'
import { SpotifyNowPlaying } from '../Spotify/SpotifyNowPlaying'
import { GitHubStats } from '../GitHub/GitHubStats'

export function Now() {
  return (
    <section id="now" className="relative z-3 pt-25 pb-40 px-5 md:px-10">
      <div className="max-w-250 mx-auto">
        <SectionHeader
          number="04"
          title="Right Now"
          subtitle="What I've been pushing (and listening to)."
          sectionId="now"
        />
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-5 items-stretch">
          <Reveal delay={100} from="left" className="flex">
            <Terminal />
          </Reveal>
          <Reveal delay={200} from="right">
            <div className="md:w-72 lg:w-80 flex flex-col gap-5">
              <SpotifyNowPlaying />
              <GitHubStats />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
