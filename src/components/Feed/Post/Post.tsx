import '/src/styles/Posts.css'
import { MdOutlineMoreHoriz } from 'react-icons/md'
import { VscSmiley } from 'react-icons/vsc'

import {
  HiOutlinePaperAirplane,
  HiOutlineHeart,
  HiOutlineChat,
  HiOutlineBookmark,
} from 'react-icons/hi'

type PostProps = {
  profile: {
    picture: string
    username: string
    post: string
    location: string
    like: number
    caption: string
  }
}
export function Post({ profile }: PostProps) {
  return (
    <article className="post">
      <div className="post__header">
        <div className="post__header--wrapper">
          <img src={profile.picture} alt={profile.username} />
          <span className="post__profile--info">
            <p>{profile.username}</p>
            <p>{profile.location}</p>
          </span>
        </div>{' '}
        <MdOutlineMoreHoriz className="ellipsis" />
      </div>

      <img src={profile.post} alt="Instagram post" className="post__image" />

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
          <p>{profile.like} likes</p>
        </div>
        <div className="post__caption">
          <p>
            <span className="thick">{profile.username}</span> {profile.caption}
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
