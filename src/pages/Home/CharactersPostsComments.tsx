import { firebaseDb } from '../../library/firebase'
import { useState, useEffect } from 'react'
import { CharactersPostsComment } from './CharactersPostsComment'
import {
  query,
  orderBy,
  onSnapshot,
  collection,
  CollectionReference,
} from 'firebase/firestore'

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
export function CharactersPostsComments({ animeId }: AnimeCommentsProps) {
  const [comments, setComments] = useState<Comments[]>([])

  const commentsCollectionReference = collection(
    firebaseDb,
    'profiles',
    animeId,
    'comments'
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
            <CharactersPostsComment
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
