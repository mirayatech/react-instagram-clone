import '../../../styles/Posts.css'
import '../../../styles/utilities.css'

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
  HiOutlinePaperAirplane as Plane,
  HiOutlineHeart as OutlinedHeart,
  HiHeart as FilledHeart,
  HiOutlineChat as Comment,
  HiOutlineBookmark as SavePost,
} from 'react-icons/hi'
import { MdOutlineMoreHoriz } from 'react-icons/md'

import { useAuthContext } from '../../../context/AuthContext'
import { firebaseAuth, firebaseDb } from '../../../library/firebase'
import { Comments } from './Comments/Comments'
import { EllipsisModal } from './EllipsisModal'

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
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [likes, setLikes] = useState<Like[]>([])
  const [hasLiked, setHasLiked] = useState(false)
  const likeCollectionReference = collection(
    firebaseDb,
    `posts/${postId}/likes`
  ) as CollectionReference<Like>

  const { user } = useAuthContext()

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
        doc(
          firebaseDb,
          `posts/${postId}/likes/${firebaseAuth.currentUser?.uid}`
        )
      )
    } else {
      await setDoc(
        doc(
          firebaseDb,
          `posts/${postId}/likes/${firebaseAuth.currentUser?.uid}`
        ),
        {
          username: firebaseAuth.currentUser?.displayName,
        }
      )
    }
  }

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__header--wrapper">
          <img src={userImage} alt="your profile" />
          <p className="username">{username}</p>
        </div>
        {postUserId === firebaseAuth.currentUser?.uid && (
          <button
            className="post__header--ellipsis"
            aria-label="Continue to delete your post"
          >
            <MdOutlineMoreHoriz onClick={() => setIsOpen(true)} />
          </button>
        )}
        {isOpen ? <EllipsisModal postId={postId} setIsOpen={setIsOpen} /> : ''}
      </div>

      <img src={image} alt="an instagram post" className="post__image" />

      <div className="post__container">
        {user?.uid && (
          <div className="post__actions">
            <div className="post__actions--wrapper">
              {hasLiked ? (
                <motion.button
                  aria-label="like post"
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
                    className="post--icons heart"
                    onClick={likePost}
                  />
                </motion.button>
              ) : (
                <button aria-label="unlike post">
                  <OutlinedHeart
                    className="post--icons heart-outline"
                    onClick={likePost}
                  />
                </button>
              )}

              <Comment className="post--icons" />
              <Plane className="post--icons" />
            </div>
            <SavePost className="post--icons" />
          </div>
        )}

        <div className="post__likes">
          {likes.length > 0 && <p>{likes.length} likes</p>}
        </div>
        <div className="post__caption">
          <p>
            <span className="username thick">{username}</span> {caption}
          </p>
        </div>
        <Comments postId={postId} />
      </div>
    </div>
  )
}
