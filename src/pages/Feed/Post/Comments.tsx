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

import { HiOutlineHeart, HiHeart } from 'react-icons/hi'

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
  const deleteComment = async () => {
    const commentDocument = doc(
      firebaseDb,
      `posts/${postId}`,
      `comments/${commentId}`
    )
    await deleteDoc(commentDocument)
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
            <HiHeart className="comment__heart " />
          </motion.button>
        </div>
        <div className="comment__footer">
          <p>0 like</p>{' '}
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
