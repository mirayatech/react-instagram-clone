import type { CollectionReference } from 'firebase/firestore'

import { query, orderBy, onSnapshot, collection } from 'firebase/firestore'
import { useState, useEffect } from 'react'

import { firebaseDb } from '../../../../library/firebase'
import { DemonSlayerComment } from './DemonSlayerComment'

import '../../../../styles/Comments.css'
import '../../../../styles/utilities.css'

type Comments = {
  comment: string
  profile: string
  commentId: string
  commentUserId: string
  profileImage: string
}

type AnimeCommentsProps = {
  animeId: string
}
export function DemonSlayerComments({ animeId }: AnimeCommentsProps) {
  const [comments, setComments] = useState<Comments[]>([])

  const commentsCollectionReference = collection(
    firebaseDb,
    `profiles/${animeId}/comments`
  ) as CollectionReference<Comments>

  useEffect(() => {
    const getComments = async () =>
      onSnapshot(
        query(commentsCollectionReference, orderBy('timestamp', 'desc')),
        (snapshot) => {
          return setComments(
            snapshot.docs.map((doc) => ({ ...doc.data(), commentId: doc.id }))
          )
        }
      )
    getComments()
  }, [firebaseDb, animeId])

  return (
    <div className="comments">
      {comments.map(
        ({ profile, profileImage, comment, commentUserId, commentId }) => {
          return (
            <DemonSlayerComment
              animeId={animeId}
              key={commentId}
              profile={profile}
              comment={comment}
              commentId={commentId}
              profileImage={profileImage}
              commentUserId={commentUserId}
            />
          )
        }
      )}
    </div>
  )
}
