import type { Dispatch, SetStateAction } from 'react'

import { deleteDoc, doc } from 'firebase/firestore'
import { motion } from 'framer-motion'

import { firebaseDb } from '../../../library/firebase'

import '../../../styles/utilities.css'

type PostModalProps = {
  postId: string
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function EllipsisModal({ setIsOpen, postId }: PostModalProps) {
  const deletePost = async () => {
    const postDoc = doc(firebaseDb, `posts/${postId}`)
    await deleteDoc(postDoc)
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            delay: 0.2,
          },
        },
      }}
      className="overlay"
      onClick={() => setIsOpen(false)}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            scale: 0.8,
            opacity: 0,
          },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              delay: 0.4,
            },
          },
        }}
        className="modal"
      >
        <p tabIndex={0} className="modal__info">
          Are you sure you want to delete this post?
        </p>

        <button className="modal__action--button" onClick={() => deletePost()}>
          Delete Post
        </button>
        <button
          className="modal__cancel--button"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
      </motion.div>
    </motion.div>
  )
}
