import { firebaseAuth, firebaseDb } from '../../../../library/firebase'
import { VscSmiley as Smiley } from 'react-icons/vsc'
import { useState, useEffect } from 'react'
import { AnimeComment } from './AnimeComment'
import {
  query,
  addDoc,
  orderBy,
  onSnapshot,
  collection,
  serverTimestamp,
  CollectionReference,
} from 'firebase/firestore'
import '../../../../styles/Comments.css'
import '../../../../styles/utilities.css'

type Comments = {
  comment: string
  profile: string
  commentId: string
  commentUserId: string
  profileImage: string
  timestamp: { seconds: number; nanoseconds: number }
}

type AnimeCommentsProps = {
  animeId: string
}
export function AnimeComments({ animeId }: AnimeCommentsProps) {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<Comments[]>([])

  const commentsCollectionReference = collection(
    firebaseDb,
    `profiles/${animeId}/comments`
  ) as CollectionReference<Comments>

  const sendComment = async () => {
    const commentToSend = comment
    setComment('')

    await addDoc(commentsCollectionReference, {
      comment: commentToSend,
      profile: firebaseAuth.currentUser?.displayName,
      profileImage: firebaseAuth.currentUser?.photoURL,
      commentUserId: firebaseAuth.currentUser?.uid,
      timestamp: serverTimestamp(),
    })
  }

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
    <>
      <div className="comments">
        {comments.map(
          ({ profile, profileImage, comment, commentUserId, commentId }) => {
            return (
              <AnimeComment
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

      <div className="comments__container">
        <Smiley className="comments__container--icon" />

        <input
          value={comment}
          className="comments__container--input"
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          name="comment"
          type="text"
        />
        <button
          className="comments__container--button"
          onClick={sendComment}
          disabled={!comment.trim()}
        >
          Post
        </button>
      </div>
    </>
  )
}
