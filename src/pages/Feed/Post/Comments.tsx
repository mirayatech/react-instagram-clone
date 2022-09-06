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
  id: string
  comment: string
  username: string | undefined
  userImage: string | undefined
  userId: string
}

export function Comments({
  comment,
  username,
  userImage,
  id,
  userId,
}: CommentsProps) {
  const [likesComment, setLikesComment] = useState([])
  const [hasLikedComment, setHasLikedComment] = useState(false)

  useEffect(
    () =>
      onSnapshot(collection(firebaseDb, 'comments', id, 'likes'), (snapshot) =>
        setLikesComment(snapshot.docs)
      ),
    [firebaseDb, id]
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

  const likePost = async () => {
    if (hasLikedComment) {
      await deleteDoc(
        doc(
          firebaseDb,

          'comments',
          id,
          'likes',
          firebaseAuth.currentUser?.uid
        )
      )
    } else {
      await setDoc(
        doc(
          firebaseDb,

          'comments',
          id,
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
      <img src={userImage} alt="profile picture" />

      <div className="comment__wrapper">
        <div className="comment__info">
          <p>
            <span className="comment__username"> {username}</span>
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
            >
              <HiHeart className="comment__heart " onClick={likePost} />
            </motion.button>
          ) : (
            <button>
              <HiOutlineHeart
                className="comment__heart outline"
                onClick={likePost}
              />
            </button>
          )}
        </div>
        <div className="comment__footer">
          {likesComment.length > 0 && <p>{likesComment.length} likes</p>}
          <button className="delete__comment">Delete </button>
        </div>
      </div>
    </div>
  )
}
