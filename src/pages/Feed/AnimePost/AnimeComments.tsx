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
  animeCommentUserId: string
  animeCommentId: string
  animeComment: string
  animeProfile: string
  animeProfileImage: string
}

type Like = {
  username: string
  firebaseDb: Firestore
  postId: string
  commentId: string
}

export function AnimeComments({
  animeProfile,
  animeProfileImage,
  animeComment,
  animeCommentUserId,
  animeCommentId,
  animeId,
}: AnimeCommentsProps) {
  const [likesComment, setLikesComment] = useState([])
  const [hasLikedComment, setHasLikedComment] = useState(false)

  return (
    <div className="comment">
      <img src={animeProfileImage} alt="profile picture" />

      <div className="comment__wrapper">
        <div className="comment__info">
          <p>
            <span className="comment__username"> {animeProfile}</span>
            {animeComment}
          </p>
        </div>
        <div className="comment__footer"></div>
      </div>
    </div>
  )
}
