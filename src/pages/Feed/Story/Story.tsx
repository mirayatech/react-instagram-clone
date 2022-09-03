type StoryProps = {
  story: {
    picture: string
    username: string
  }
}

export function Story({ story }: StoryProps) {
  return (
    <div className="story">
      <div className="story__image">
        <img src={story.picture} alt="Story" />
      </div>
      <p>{story.username}</p>
    </div>
  )
}
