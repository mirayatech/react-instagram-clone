import type { CollectionReference} from 'firebase/firestore';

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { firebaseDb } from '../../../../library/firebase'
import '../../../../styles/Comments.css'
import '../../../../styles/utilities.css'

type Like = {
  username: string
  animeId: string
  commentId: string
  likeId: string
}

type CommentsProps = {
  animeId: string
  comment: string
  profile: string
  commentId: string
  profileImage: string
  commentUserId: string
}

export function DemonSlayerComment({
  animeId,
  comment,
  profile,
  commentId,
  profileImage,
}: CommentsProps) {
  const [likesComment, setLikesComment] = useState<Like[]>([])
  const likeCollectionReference = collection(
    firebaseDb,
    `profiles/${animeId}/comments/${commentId}/likes`
  ) as CollectionReference<Like>

  useEffect(
    () =>
      onSnapshot(likeCollectionReference, (snapshot) =>
        setLikesComment(
          snapshot.docs.map((doc) => ({ ...doc.data(), likeId: doc.id }))
        )
      ),
    [firebaseDb, commentId]
  )

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
        <div className="comment__footer">
          {likesComment.length > 0 && <p>{likesComment.length} likes</p>}
        </div>
      </div>
    </div>
  )
}
