import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { VscSmiley } from 'react-icons/vsc'
import { MdOutlineMoreHoriz } from 'react-icons/md'

import {
  HiOutlinePaperAirplane,
  HiOutlineHeart,
  HiOutlineChat,
  HiOutlineBookmark,
} from 'react-icons/hi'

import { useEffect, useState } from 'react'
import { firebaseDb } from '../../library/firebase'

export function UploadPost() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firebaseDb, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(snapshot.docs.map((doc) => doc.data()))
      }
    )

    return () => {
      unsubscribe()
    }
  }, [firebaseDb])

  return (
    <>
      {posts.map((post) => {
        return (
          <article className="post">
            <div className="post__header">
              <div className="post__header--wrapper">
                <img src={post.profileImg} alt={post.username} />
                <span className="post__post--info">
                  <p className="username">{post.username}</p>
                </span>
              </div>{' '}
              <MdOutlineMoreHoriz className="ellipsis" />
            </div>

            <img
              src={post.image}
              alt="Instagram post"
              className="post__image"
            />

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
                  <span className="thick">{post.username}</span> {post.caption}
                </p>
              </div>

              <div className="post__commenting">
                <VscSmiley className="post__commenting--icon" />

                <input
                  type="text"
                  name="comment"
                  placeholder="Add a comment..."
                />
                <button>Post</button>
              </div>
            </div>
          </article>
        )
      })}
    </>
  )
}
