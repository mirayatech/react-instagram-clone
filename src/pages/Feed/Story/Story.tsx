import './stories.css'
import type { StoryType } from './Stories'

type StoryProps = {
  story: StoryType
}

export function Story({ story: { profile, username } }: StoryProps) {
  return (
    <div className="story">
      <div className="story__image">
        <img src={profile} alt="Story" />
      </div>
      <p>{username}</p>
    </div>
  )
}
