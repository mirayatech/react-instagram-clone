type StoryProps = {
  story: {
    picture: string
    username: string
    post: string
    caption: string
  }
}

export function Story({ story }: StoryProps) {
  return (
    <div className="story">
      <div className="story__image">
        <img src={story.picture} alt="A Story" />
      </div>
      <p>{story.username}</p>
    </div>
  )
}
