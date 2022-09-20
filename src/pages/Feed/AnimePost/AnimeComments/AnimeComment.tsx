import type { Comment } from './AnimeComments'
import type { CollectionReference } from 'firebase/firestore'

import {
  doc,
  collection,
  deleteDoc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  HiOutlineHeart as OutlinedHeart,
  HiHeart as FilledHeart,
} from 'react-icons/hi'
import '../../../../styles/Comments.css'
import '../../../../styles/utilities.css'

import { useAuthContext } from '../../../../context/AuthContext'
import { firebaseAuth, firebaseDb } from '../../../../library/firebase'

type Like = {
  username: string
  animeId: string
  id: string
  likeId: string
}

type AnimeCommentProps = {
  comment: Comment
  animeId: string
}

export function AnimeComment({
  comment: { comment, id, commentUserId, profile, profileImage },
  animeId,
}: AnimeCommentProps) {
  const { user } = useAuthContext()

  const [hasLikedComment, setHasLikedComment] = useState(false)
  const [likesComment, setLikesComment] = useState<Like[]>([])

  const likeCollectionReference = collection(
    firebaseDb,
    `profiles/${animeId}/comments/${id}/likes`
  ) as CollectionReference<Like>

  const deleteComment = async () => {
    const commentDocument = doc(
      firebaseDb,
      `profiles/${animeId}/comments/${id}`
    )
    await deleteDoc(commentDocument)
  }

  useEffect(() => {
    onSnapshot(likeCollectionReference, (snapshot) =>
      setLikesComment(
        snapshot.docs.map((doc) => ({ ...doc.data(), likeId: doc.id }))
      )
    )
  }, [firebaseDb, id])

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
      `profiles/${animeId}/comments/${id}/likes/${firebaseAuth.currentUser?.uid}`
    )

    if (hasLikedComment) {
      await deleteDoc(likeDocument)
    } else {
      await setDoc(likeDocument, {
        username: firebaseAuth.currentUser?.displayName,
      })
    }
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
                  className="comment__heart outlined"
                  aria-label="unlike comment"
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
