import { deleteDoc, doc } from 'firebase/firestore'
import { firebaseDb } from '../../../library/firebase'
import { motion } from 'framer-motion'

type PostModalProps = {
  setIsOpen: any
  id: string
}

export function PostModal({ setIsOpen, id }: PostModalProps) {
  const deletePost = async () => {
    const postDoc = doc(firebaseDb, `posts/${id}`)
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
        className="post__modal"
      >
        <button onClick={() => deletePost(id)}>Delete Post</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </motion.div>
    </motion.div>
  )
}
