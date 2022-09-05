import '/src/styles/Posts.css'
import { VscSmiley } from 'react-icons/vsc'
import { MdOutlineMoreHoriz } from 'react-icons/md'
import { motion } from 'framer-motion'
import { Comments } from './Comments'
import { PostModal } from './PostModal'
import {
  HiOutlinePaperAirplane,
  HiOutlineHeart,
  HiHeart,
  HiOutlineChat,
  HiOutlineBookmark,
} from 'react-icons/hi'
import { useEffect, useState } from 'react'
import {
  doc,
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { firebaseAuth, firebaseDb } from '../../../library/firebase'

type PostProps = {
  id: string
  caption: string
  profileImg: string
  image: string
  username: string
  userId: string
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

export function Post({
  username,
  profileImg,
  image,
  caption,
  userId,
  id,
}: PostProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<Comments[]>([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

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
  }, [firebaseDb, id])

  // Likes

  useEffect(
    () =>
      onSnapshot(collection(firebaseDb, 'posts', id, 'likes'), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [firebaseDb, id]
  )

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === firebaseAuth.currentUser?.uid) !==
          -1
      ),
    [likes]
  )

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(
        doc(firebaseDb, 'posts', id, 'likes', firebaseAuth.currentUser?.uid)
      )
    } else {
      await setDoc(
        doc(firebaseDb, 'posts', id, 'likes', firebaseAuth.currentUser?.uid),
        {
          username: firebaseAuth.currentUser?.displayName,
        }
      )
    }
  }

  return (
    <article className="post">
      <div className="post__header">
        <div className="post__header--wrapper">
          <img src={profileImg} alt={username} />
          <span className="post__post--info">
            <p className="username">{username}</p>
          </span>
        </div>
        {userId === firebaseAuth.currentUser?.uid && (
          <button className="ellipsis">
            <MdOutlineMoreHoriz onClick={() => setIsOpen(true)} />
          </button>
        )}
        {isOpen ? <PostModal id={id} setIsOpen={setIsOpen} /> : ''}
      </div>

      <img src={image} alt="Instagram post" className="post__image" />

      <div className="post__description">
        <div className="post__actions">
          <div className="post__actions--wrapper">
            {hasLiked ? (
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
                <HiHeart
                  className="post__actions--icon heart"
                  onClick={likePost}
                />
              </motion.button>
            ) : (
              <button>
                <HiOutlineHeart
                  className="post__actions--icon heart-outline"
                  onClick={likePost}
                />
              </button>
            )}

            <HiOutlineChat className="post__actions--icon" />
            <HiOutlinePaperAirplane className="post__actions--icon" />
          </div>
          <HiOutlineBookmark className="post__actions--icon" />
        </div>

        <div className="post__likes">
          {likes.length > 0 && <p>{likes.length} likes</p>}
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
