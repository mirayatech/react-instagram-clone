type CommentsProps = {
  comment: string
  username: string | undefined
  userImage: string | undefined
}

export function Comments({ comment, username, userImage }: CommentsProps) {
  return (
    <div className="comment">
      <img src={userImage} alt="profile picture" />
      <div className="comment__wrapper">
        <p>
          <span className="comment__username"> {username}</span>
          {comment}
        </p>
      </div>
    </div>
  )
}
