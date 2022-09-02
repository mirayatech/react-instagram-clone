import '/src/styles/Posts.css'
import { VscSmiley } from 'react-icons/vsc'
import { MdOutlineMoreHoriz } from 'react-icons/md'

import {
  HiOutlinePaperAirplane,
  HiOutlineHeart,
  HiOutlineChat,
  HiOutlineBookmark,
} from 'react-icons/hi'

type PostProps = {
  post:
    | {
        picture: string
        username: string
        post: string
        location: string
        likes: number
        caption: string
      }
    | {
        picture: string
        username: string
        post: string
        location?: undefined
        likes: number
        caption: string
      }
}

export function Post({ post }: PostProps) {
  return (
    <article className="post">
      <div className="post__header">
        <div className="post__header--wrapper">
          <img src={post.picture} alt={post.username} />
          <span className="post__post--info">
            <p className="username">{post.username}</p>
            <p>{post.location}</p>
          </span>
        </div>{' '}
        <MdOutlineMoreHoriz className="ellipsis" />
      </div>

      <img src={post.post} alt="Instagram post" className="post__image" />

      <div className="post__description">
        <div className="post__actions">
          <div className="post__actions--wrapper">
            <HiOutlineHeart className="post__actions--icon" />
            <HiOutlineChat className="post__actions--icon" />
            <HiOutlinePaperAirplane className="post__actions--icon" />
          </div>
          <HiOutlineBookmark className="post__actions--icon" />
        </div>

        <div className="post__likes">
          <p>{post.likes} likes</p>
        </div>
        <div className="post__caption">
          <p>
            <span className="thick">{post.username}</span> {post.caption}
          </p>
        </div>

        <div className="post__commenting">
          <VscSmiley className="post__commenting--icon" />

          <input type="text" name="comment" placeholder="Add a comment..." />
          <button>Post</button>
        </div>
      </div>
    </article>
  )
}
