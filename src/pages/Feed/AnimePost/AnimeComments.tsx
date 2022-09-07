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

type AnimeCommentsProps = {
  profile: string
  profileImage: string
  comment: string
  commentUserId: string
  commentId: string
  animeId: string
}

type Like = {
  username: string
  firebaseDb: Firestore
  postId: string
  commentId: string
}

export function AnimeComments({
  profile,
  profileImage,
  comment,
  commentUserId,
  commentId,
  animeId,
}: AnimeCommentsProps) {
  const [likesComment, setLikesComment] = useState([])
  const [hasLikedComment, setHasLikedComment] = useState(false)

  return (
    <div className="comment">
      <img src={profileImage} alt="profile picture" />

      <div className="comment__wrapper">
        <div className="comment__info">
          <p>
            <span className="comment__username"> {profile}</span>
            {comment}
          </p>
        </div>
        <div className="comment__footer"></div>
      </div>
    </div>
  )
}
