import '/src/styles/Posts.css'
import { VscSmiley } from 'react-icons/vsc'
import { MdOutlineMoreHoriz } from 'react-icons/md'
import { Comments } from './Comments'
import {
  HiOutlinePaperAirplane,
  HiOutlineHeart,
  HiOutlineChat,
  HiOutlineBookmark,
} from 'react-icons/hi'
import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  CollectionReference,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { firebaseAuth, firebaseDb } from '../../../library/firebase'

type PostProps = {
  id: string
  caption: string
  profileImg: string
  image: string
  username: string
}

type Comments = {
  comment: string
  username: string | null | undefined
  userImage: string | null | undefined
  timestamp: {
    nanoseconds: number
    seconds: number
  }
}

export function Post({ username, profileImg, image, caption, id }: PostProps) {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<Comments[]>([])

  const commentsCollectionReference = collection(
    firebaseDb,
    'posts',
    id,
    'comments'
  ) as CollectionReference<Comments>

  const sendComment = async () => {
    const commentToSend = comment
    setComment('')

    await addDoc(commentsCollectionReference, {
      comment: commentToSend,
      username: firebaseAuth.currentUser?.displayName,
      userImage: firebaseAuth.currentUser?.photoURL,
      timestamp: serverTimestamp(),
    })
  }

  useEffect(() => {
    const getComments = async () =>
      onSnapshot(
        query(commentsCollectionReference, orderBy('timestamp', 'desc')),
        (snapshot) => {
          return setComments(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        }
      )
    getComments()
  }, [firebaseDb])

  return (
    <article className="post">
      <div className="post__header">
        <div className="post__header--wrapper">
          <img src={profileImg} alt={username} />
          <span className="post__post--info">
            <p className="username">{username}</p>
          </span>
        </div>
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
        <div className="comments">
          {comments.map(({ username, userImage, comment, timestamp }, id) => {
            return (
              <Comments
                key={id}
                username={username}
                userImage={userImage}
                comment={comment}
                timestamp={timestamp}
              />
            )
          })}
        </div>
        <div className="post__commenting">
          <VscSmiley className="post__commenting--icon" />

          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            name="comment"
            placeholder="Add a comment..."
          />
          <button onClick={sendComment} disabled={!comment.trim()}>
            Post
          </button>
        </div>
      </div>
    </article>
  )
}
