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
      <img src={profile.picture} alt="A Story" />
      <p>{profile.username}</p>
    </div>
  )
}
