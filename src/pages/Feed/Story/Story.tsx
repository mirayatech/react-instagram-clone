import './stories.css'

export type StoryType = {
  username: string
  storyId: string
  picture: string
  caption: string
  post: string
  id: string
}

type StoryProps = {
  story: StoryType
}

export function Story({ story: { picture, username } }: StoryProps) {
  return (
    <div className="story">
      <div className="story__image">
        <img src={picture} alt="Story" />
      </div>
      <p>{username}</p>
    </div>
  )
}
