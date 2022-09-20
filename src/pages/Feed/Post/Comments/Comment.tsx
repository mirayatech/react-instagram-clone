import '../../../../styles/Comments.css'
import '../../../../styles/utilities.css'
import type { CommentType } from './Comments'
import type { CollectionReference } from 'firebase/firestore'

import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
} from 'firebase/firestore'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  HiOutlineHeart as OutlinedHeart,
  HiHeart as FilledHeart,
} from 'react-icons/hi'

import { useAuthContext } from '../../../../context/AuthContext'
import { firebaseAuth, firebaseDb } from '../../../../library/firebase'

type Like = {
  likeId: string
  postId: string
  username: string
  commentId: string
}

type CommentsProps = {
  postId: string
  comment: CommentType
}

export function Comment({
  postId,
  comment: { comment, commentId, commentUserId, profile, profileImage },
}: CommentsProps) {
  const [hasLikedComment, setHasLikedComment] = useState(false)
  const [likesComment, setLikesComment] = useState<Like[]>([])
  const likeCollectionReference = collection(
    firebaseDb,
    `posts/${postId}/comments/${commentId}/likes`
  ) as CollectionReference<Like>
  const { user } = useAuthContext()

  useEffect(
    () =>
      onSnapshot(likeCollectionReference, (snapshot) =>
        setLikesComment(
          snapshot.docs.map((doc) => ({ ...doc.data(), likeId: doc.id }))
        )
      ),
    [firebaseDb, commentId]
  )

  useEffect(
    () =>
      setHasLikedComment(
        likesComment.findIndex(
          (like) => like.likeId === firebaseAuth.currentUser?.uid
        ) !== -1
      ),
    [likesComment]
  )

  const likeComment = async () => {
    const likeDocument = doc(
      firebaseDb,
      `posts/${postId}/comments/${commentId}/likes/${firebaseAuth.currentUser?.uid}`
    )

    if (hasLikedComment) {
      await deleteDoc(likeDocument)
    } else {
      await setDoc(likeDocument, {
        username: firebaseAuth.currentUser?.displayName,
      })
    }
  }

  const deleteComment = async () => {
    const commentDocument = doc(
      firebaseDb,
      `posts/${postId}/comments/${commentId}`
    )
    await deleteDoc(commentDocument)
  }
  return (
    <div className="comment">
      <img src={profileImage || ''} alt="profile picture" />

      <div className="comment__wrapper">
        <div className="comment__info">
          <p>
            <span className="comment__username"> {profile}</span>
            {comment}
          </p>
          {user?.uid && (
            <>
              {' '}
              {hasLikedComment ? (
                <motion.button
                  aria-label="like comment"
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
                <button
                  aria-label="unlike comment"
                  className="comment__heart outlined"
                >
                  <OutlinedHeart onClick={likeComment} />
                </button>
              )}{' '}
            </>
          )}
        </div>
        <div className="comment__footer">
          {likesComment.length > 0 && <p>{likesComment.length} likes</p>}
          {commentUserId === firebaseAuth.currentUser?.uid && (
            <button
              className="comment__delete--button"
              onClick={() => deleteComment()}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
