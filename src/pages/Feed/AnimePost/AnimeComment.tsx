type AnimeCommentProps = {
  ourComment: string
  ourProfile: string
  ourProfilePicture: string
  ourCommentUserId: string
  ourCommentId: string
  animeId: string
}

export function AnimeComment({
  ourComment,
  ourProfile,
  ourProfilePicture,
  ourCommentUserId,
  ourCommentId,
  animeId,
}: AnimeCommentProps) {
  return (
    <div className="comment">
      <img src={ourProfilePicture} alt="profile picture" />

      <div className="comment__wrapper">
        <div className="comment__info">
          <p>
            <span className="comment__username"> {ourProfile}</span>
            {ourComment}
          </p>
        </div>
      </div>
    </div>
  )
}
