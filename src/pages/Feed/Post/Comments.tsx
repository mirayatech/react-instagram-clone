import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Firestore,
  doc,
  CollectionReference,
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

type Like = {
  username: string
  firebaseDb: Firestore
  postId: string
  commentId: string
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

  const likeCollectionReference = collection(
    firebaseDb,
    'posts',
    postId,
    'comments',
    commentId,
    'likes'
  ) as CollectionReference<Like>

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
      onSnapshot(likeCollectionReference, (snapshot) =>
        setLikesComment(snapshot.docs)
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
    const likeDocument = doc(
      firebaseDb,
      'posts',
      postId,
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
