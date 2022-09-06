import { VscSmiley as Smiley } from 'react-icons/vsc'
import {
  HiOutlinePaperAirplane as Plane,
  HiOutlineHeart as OutlinedHeart,
  HiHeart as FilledHeart,
  HiOutlineChat as Comment,
  HiOutlineBookmark as SavePost,
} from 'react-icons/hi'

type AnimePost = {
  picture: string
  caption: string
  username: string
  post: string
  animeId: string
}
export function AnimePost({
  username,
  picture,
  caption,
  post,
  animeId,
}: AnimePost) {
  return (
    <article className="post">
      <div className="post__header">
        <div className="post__header--wrapper">
          <img src={picture} alt={username} />
          <span className="post__post--info">
            <p className="username">{username}</p>
          </span>
        </div>
      </div>

      <img src={post} alt="Instagram post" className="post__image" />

      <div className="post__description">
        <div className="post__actions">
          <div className="post__actions--wrapper">
            {/* {hasLiked ? (
              <motion.button
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {
                    scale: 1.2,
                  },
                  visible: {
                    scale: 1,
                    transition: {
                      delay: 0.1,
                    },
                  },
                }}
              >
                <FilledHeart
                  className="post__actions--icon heart"
                  onClick={likePost}
                />
              </motion.button>
            ) : (
              <button>
                <OutlinedHeart
                  className="post__actions--icon heart-outline"
                  onClick={likePost}
                />
              </button>
            )} */}

            <Comment className="post__actions--icon" />
            <Plane className="post__actions--icon" />
          </div>
          <SavePost className="post__actions--icon" />
        </div>

        <div className="post__likes">
          {/* {likes.length > 0 && <p>{likes.length} likes</p>} */}
        </div>
        <div className="post__caption">
          <p>
            <span className="thick">{username}</span> {caption}
          </p>
        </div>
        <div className="comments">
          {/* {comments.map(
            ({ profile, profileImage, comment, commentUserId, commentId }) => {
              return (
                <Comments
                  key={commentId}
                  profile={profile}
                  profileImage={profileImage}
                  comment={comment}
                  commentId={commentId}
                  postId={postId}
                  commentUserId={commentUserId}
                />
              )
            }
          )} */}
        </div>
        <div className="post__commenting">
          <Smiley className="post__commenting--icon" />

          <input type="text" name="comment" placeholder="Add a comment..." />
          <button>Post</button>
        </div>
      </div>
    </article>
  )
}
