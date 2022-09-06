import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  doc,
  collection,
  deleteDoc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore'
import { firebaseAuth, firebaseDb } from '../../../library/firebase'

import {
  HiOutlineHeart as OutlinedHeart,
  HiHeart as FilledHeart,
} from 'react-icons/hi'

type CommentsProps = {
  postId: string
  commentId: string
  comment: string
  profile: string
  profileImage: string
  commentUserId: string
}

export function Comments({
  comment,
  profile,
  profileImage,
  commentId,
  postId,
  commentUserId,
}: CommentsProps) {
  const [likesComment, setLikesComment] = useState([])
  const [hasLikedComment, setHasLikedComment] = useState(false)

  const deleteComment = async () => {
    const commentDocument = doc(
      firebaseDb,
      `posts/${postId}`,
      `comments/${commentId}`
    )
    await deleteDoc(commentDocument)
  }

  useEffect(
    () =>
      onSnapshot(
        collection(firebaseDb, 'comments', commentId, 'likes'),
        (snapshot) => setLikesComment(snapshot.docs)
      ),
    [firebaseDb, commentId]
  )

  useEffect(
    () =>
      setHasLikedComment(
        likesComment.findIndex(
          (like) => like.id === firebaseAuth.currentUser?.uid
        ) !== -1
      ),
    [likesComment]
  )

  const likeComment = async () => {
    if (hasLikedComment) {
      await deleteDoc(
        doc(
          firebaseDb,
          'comments',
          commentId,
          'likes',
          firebaseAuth.currentUser?.uid
        )
      )
    } else {
      await setDoc(
        doc(
          firebaseDb,
          'comments',
          commentId,
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
    <div className="comment">
      <img src={profileImage} alt="profile picture" />

      <div className="comment__wrapper">
        <div className="comment__info">
          <p>
            <span className="comment__username"> {profile}</span>
            {comment}
          </p>

          {hasLikedComment ? (
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
              className="comment__heart"
            >
              <FilledHeart onClick={likeComment} />
            </motion.button>
          ) : (
            <button className="comment__heart outlined">
              <OutlinedHeart onClick={likeComment} />
            </button>
          )}
        </div>
        <div className="comment__footer">
          {likesComment.length === 1 && <p>{likesComment.length} likes</p>}
          {commentUserId === firebaseAuth.currentUser?.uid && (
            <button
              className="delete__comment"
              onClick={() => deleteComment(commentId)}
            >
              Delete{' '}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
