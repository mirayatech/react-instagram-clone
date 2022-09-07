import { VscSmiley as Smiley } from 'react-icons/vsc'
import { useState, useEffect } from 'react'
import { firebaseAuth, firebaseDb } from '../../../library/firebase'
import {
  collection,
  CollectionReference,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { AnimeComment } from './AnimeComment'

type AnimeCommentsProps = {
  animeId: string
}

type T = {
  ourComment: string
  ourProfile: string
  ourProfilePicture: string
  ourCommentUserId: string
  ourCommentId: string
}

export function AnimeComments({ animeId }: AnimeCommentsProps) {
  const [ourComment, setOurComment] = useState('')
  const [ourComments, setOurComments] = useState<T[]>([])

  const animeCommentsCollectionReference = collection(
    firebaseDb,
    'profiles',
    animeId,
    'comments'
  ) as CollectionReference<T>

  const sendAnimeComment = async () => {
    const commentToSend = ourComment
    setOurComment('')

    await addDoc(animeCommentsCollectionReference, {
      ourComment: commentToSend,
      ourProfile: firebaseAuth.currentUser?.displayName,
      ourProfilePicture: firebaseAuth.currentUser?.photoURL,
      ourCommentUserId: firebaseAuth.currentUser?.uid,
      timestamp: serverTimestamp(),
    })
  }

  useEffect(() => {
    const getComments = async () =>
      onSnapshot(
        query(animeCommentsCollectionReference, orderBy('timestamp', 'desc')),
        (snapshot) => {
          return setOurComments(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              ourCommentId: doc.id,
            }))
          )
        }
      )
    getComments()
  }, [firebaseDb, animeId])

  return (
    <div className="AnimeComments">
      {ourComments.map(
        ({
          ourComment,
          ourProfile,
          ourProfilePicture,
          ourCommentUserId,
          ourCommentId,
        }) => {
          return (
            <AnimeComment
              key={ourCommentId}
              ourComment={ourComment}
              ourProfile={ourProfile}
              ourCommentId={ourCommentId}
              ourProfilePicture={ourProfilePicture}
              ourCommentUserId={ourCommentUserId}
              animeId={'animeId'}
            />
          )
        }
      )}

      <div className="post__commenting">
        <Smiley className="post__commenting--icon" />

        <input
          value={ourComment}
          onChange={(e) => setOurComment(e.target.value)}
          type="text"
          name="comment"
          placeholder="Add a comment..."
        />
        <button onClick={sendAnimeComment} disabled={!ourComment.trim()}>
          Post
        </button>
      </div>
    </div>
  )
}
