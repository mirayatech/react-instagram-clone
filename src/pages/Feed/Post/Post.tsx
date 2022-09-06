import { VscSmiley as Smiley } from 'react-icons/vsc'
import { MdOutlineMoreHoriz } from 'react-icons/md'
import { motion } from 'framer-motion'
import { Comments } from './Comments'
import { EllipsisModal } from './EllipsisModal'
import {
  HiOutlinePaperAirplane as Plane,
  HiOutlineHeart as OutlinedHeart,
  HiHeart as FilledHeart,
  HiOutlineChat as Comment,
  HiOutlineBookmark as SavePost,
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
  postId: string
  caption: string
  userImage: string
  image: string
  username: string
  postUserId: string
}

type Comments = {
  commentUserId: string
  commentId: string
  comment: string
  profile: string
  profileImage: string
  timestamp: {
    nanoseconds: number
    seconds: number
  }
}

export function Post({
  username,
  userImage,
  image,
  caption,
  postUserId,
  postId,
}: PostProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<Comments[]>([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

  const commentsCollectionReference = collection(
    firebaseDb,
    'posts',
    postId,
    'comments'
  ) as CollectionReference<Comments>

  const sendComment = async () => {
    const commentToSend = comment
    setComment('')

    await addDoc(commentsCollectionReference, {
      comment: commentToSend,
      profile: firebaseAuth.currentUser?.displayName,
      profileImage: firebaseAuth.currentUser?.photoURL,
      commentUserId: firebaseAuth.currentUser?.uid,
      timestamp: serverTimestamp(),
    })
  }

  useEffect(() => {
    const getComments = async () =>
      onSnapshot(
        query(commentsCollectionReference, orderBy('timestamp', 'desc')),
        (snapshot) => {
          return setComments(
            snapshot.docs.map((doc) => ({ ...doc.data(), commentId: doc.id }))
          )
        }
      )
    getComments()
  }, [firebaseDb, postId])

  // Likes

  useEffect(
    () =>
      onSnapshot(collection(firebaseDb, 'posts', postId, 'likes'), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [firebaseDb, postId]
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
        doc(firebaseDb, 'posts', postId, 'likes', firebaseAuth.currentUser?.uid)
      )
    } else {
      await setDoc(
        doc(
          firebaseDb,
          'posts',
          postId,
          'likes',
          firebaseAuth.currentUser?.uid
        ),
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
          <img src={userImage} alt={username} />
          <span className="post__post--info">
            <p className="username">{username}</p>
          </span>
        </div>
        {postUserId === firebaseAuth.currentUser?.uid && (
          <button className="ellipsis">
            <MdOutlineMoreHoriz onClick={() => setIsOpen(true)} />
          </button>
        )}
        {isOpen ? <EllipsisModal postId={postId} setIsOpen={setIsOpen} /> : ''}
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
            )}

            <Comment className="post__actions--icon" />
            <Plane className="post__actions--icon" />
          </div>
          <SavePost className="post__actions--icon" />
        </div>

        <div className="post__likes">
          {likes.length === 1 && <p>{likes.length} likes</p>}
        </div>
        <div className="post__caption">
          <p>
            <span className="thick">{username}</span> {caption}
          </p>
        </div>
        <div className="comments">
          {comments.map(
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
          )}
        </div>
        <div className="post__commenting">
          <Smiley className="post__commenting--icon" />

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
