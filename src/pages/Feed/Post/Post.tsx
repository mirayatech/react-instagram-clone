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
  caption: string
  profileImg: string
  image: string
  username: string
}

export function Post({ username, profileImg, image, caption }: PostProps) {
  return (
    <article className="post">
      <div className="post__header">
        <div className="post__header--wrapper">
          <img src={profileImg} alt={username} />
          <span className="post__post--info">
            <p className="username">{username}</p>
          </span>
        </div>{' '}
        <MdOutlineMoreHoriz className="ellipsis" />
      </div>

      <img src={image} alt="Instagram post" className="post__image" />

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
          <p>0 likes</p>
        </div>
        <div className="post__caption">
          <p>
            <span className="thick">{username}</span> {caption}
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
