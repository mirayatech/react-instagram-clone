type StoryProps = {
  profile: {
    picture: string
    username: string
    post: string
    caption: string
  }
}

export function Story({ profile }: StoryProps) {
  return (
    <div className="story">
      <div className="story__image">
        <img src={profile.picture} alt="A Story" />
      </div>
      <p>{profile.username}</p>
    </div>
  )
}
