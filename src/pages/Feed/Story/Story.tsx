type StoryProps = {
  picture: string
  username: string
}

export function Story({ picture, username }: StoryProps) {
  return (
    <div className="story">
      <div className="story__image">
        <img src={picture} alt="Story" />
      </div>
      <p>{username}</p>
    </div>
  )
}
