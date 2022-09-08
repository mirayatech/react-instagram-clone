import {
  HiOutlinePaperAirplane as Plane,
  HiOutlineHeart as OutlinedHeart,
  HiHeart as FilledHeart,
  HiOutlineChat as Comment,
  HiOutlineBookmark as SavePost,
} from 'react-icons/hi'
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
  CollectionReference,
} from 'firebase/firestore'
import { Comments } from './Comments'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { EllipsisModal } from './EllipsisModal'
import { MdOutlineMoreHoriz } from 'react-icons/md'
import { firebaseAuth, firebaseDb } from '../../../library/firebase'

type Like = {
  likeId: string
  username: string
}

type PostProps = {
  image: string
  postId: string
  caption: string
  username: string
  userImage: string
  postUserId: string
}

export function Post({
  image,
  postId,
  caption,
  username,
  userImage,
  postUserId,
}: PostProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [likes, setLikes] = useState<Like[]>([])
  const [hasLiked, setHasLiked] = useState(false)
  const likeCollectionReference = collection(
    firebaseDb,
    'posts',
    postId,
    'likes'
  ) as CollectionReference<Like>

  useEffect(
    () =>
      onSnapshot(likeCollectionReference, (snapshot) =>
        setLikes(
          snapshot.docs.map((doc) => ({ ...doc.data(), likeId: doc.id }))
        )
      ),
    [firebaseDb, postId]
  )

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex(
          (like) => like.likeId === firebaseAuth.currentUser?.uid
        ) !== -1
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

      <div className="post__container">
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
          {likes.length > 0 && <p>{likes.length} likes</p>}
        </div>
        <div className="post__caption">
          <p>
            <span className="thick">{username}</span> {caption}
          </p>
        </div>
        <Comments postId={postId} />
      </div>
    </article>
  )
}
