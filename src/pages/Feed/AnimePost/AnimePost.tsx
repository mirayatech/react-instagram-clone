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

import { useAuthContext } from '../../../context/AuthContext'
import { firebaseAuth, firebaseDb } from '../../../library/firebase'
import { AnimeComments } from './AnimeComments/AnimeComments'

type Like = {
  likeId: string
  username: string
}

type AnimePostPropos = {
  animeId: string
  caption: string
  picture: string
  post: string
  username: string
}

export function AnimePost({
  animeId,
  caption,
  picture,
  post,
  username,
}: AnimePostPropos) {
  const [likes, setLikes] = useState<Like[]>([])
  const [hasLiked, setHasLiked] = useState(false)
  const likeCollectionReference = collection(
    firebaseDb,
    'profiles',
    animeId,
    'likes'
  ) as CollectionReference<Like>

  const { user } = useAuthContext()

  useEffect(
    () =>
      onSnapshot(likeCollectionReference, (snapshot) =>
        setLikes(
          snapshot.docs.map((doc) => ({ ...doc.data(), likeId: doc.id }))
        )
      ),
    [firebaseDb, animeId]
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
          `profiles/${animeId}/likes/${firebaseAuth.currentUser?.uid}`
        )
      )
    } else {
      await setDoc(
        doc(
          firebaseDb,
          `profiles/${animeId}/likes/${firebaseAuth.currentUser?.uid}`
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
          <img src={picture} alt={username} />
          <p className="username">{username}</p>
        </div>
      </div>

      <img src={post} alt="Instagram post" className="post__image" />

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
        <AnimeComments animeId={animeId} />
      </div>
    </div>
  )
}
