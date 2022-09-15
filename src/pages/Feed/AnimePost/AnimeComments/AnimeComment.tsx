import {
  doc,
  CollectionReference,
  collection,
  deleteDoc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore'
import {
  HiOutlineHeart as OutlinedHeart,
  HiHeart as FilledHeart,
} from 'react-icons/hi'
import '../../../../styles/Comments.css'
import '../../../../styles/utilities.css'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { firebaseAuth, firebaseDb } from '../../../../library/firebase'

type Like = {
  username: string
  animeId: string
  commentId: string
  likeId: string
}

type CommentsProps = {
  animeId: string
  comment: string
  profile: string
  commentId: string
  profileImage: string
  commentUserId: string
}

export function AnimeComment({
  animeId,
  comment,
  profile,
  commentId,
  profileImage,
  commentUserId,
}: CommentsProps) {
  const [hasLikedComment, setHasLikedComment] = useState(false)
  const [likesComment, setLikesComment] = useState<Like[]>([])
  const likeCollectionReference = collection(
    firebaseDb,
    'profiles',
    animeId,
    'comments',
    commentId,
    'likes'
  ) as CollectionReference<Like>

  const deleteComment = async () => {
    const commentDocument = doc(
      firebaseDb,
      `profiles/${animeId}`,
      `comments/${commentId}`
    )
    await deleteDoc(commentDocument)
  }

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
      'profiles',
      animeId,
      'comments',
      commentId,
      'likes',
      firebaseAuth.currentUser?.uid
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
          {likesComment.length > 0 && <p>{likesComment.length} likes</p>}
          {commentUserId === firebaseAuth.currentUser?.uid && (
            <button
              className="comment__delete--button"
              onClick={() => deleteComment(commentId)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
