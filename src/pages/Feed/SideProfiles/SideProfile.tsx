type StoryProps = {
  username: string
  picture: string
  info: string
}
export function SideProfile({ username, picture, info }: StoryProps) {
  return (
    <div className="profile">
      <img src={picture} alt="profile picture" />
      <div className="profile--info">
        <p className="username">{username}</p>
        <p>{info}</p>
      </div>
      <button>Follow</button>
    </div>
  )
}
