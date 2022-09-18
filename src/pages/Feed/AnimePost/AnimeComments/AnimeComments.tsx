import type { CollectionReference } from 'firebase/firestore'

import {
  query,
  addDoc,
  orderBy,
  onSnapshot,
  collection,
  serverTimestamp,
} from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { VscSmiley as Smiley } from 'react-icons/vsc'

import { useAuthContext } from '../../../../context/AuthContext'
import { firebaseAuth, firebaseDb } from '../../../../library/firebase'
import { AnimeComment } from './AnimeComment'

import '../../../../styles/Comments.css'
import '../../../../styles/utilities.css'

export type Comment = {
  comment: string
  profile: string | null
  id: string
  commentUserId: string
  profileImage: string | null
  timestamp: { seconds: number; nanoseconds: number }
}

type AnimeCommentsProps = {
  animeId: string
}
export function AnimeComments({ animeId }: AnimeCommentsProps) {
  const { user } = useAuthContext()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<Comment[]>([])

  const commentsCollectionReference = collection(
    firebaseDb,
    `profiles/${animeId}/comments`
  ) as CollectionReference<Comment>

  const sendComment = async () => {
    const commentToSend = comment
    setComment('')

    if (firebaseAuth.currentUser) {
      await addDoc(commentsCollectionReference, {
        id: '',
        comment: commentToSend,
        profile: firebaseAuth.currentUser.displayName,
        profileImage: firebaseAuth.currentUser.photoURL,
        commentUserId: firebaseAuth.currentUser.uid,
        timestamp: serverTimestamp(),
      })
    }
  }

  useEffect(() => {
    const getComments = async () =>
      onSnapshot(
        query(commentsCollectionReference, orderBy('timestamp', 'desc')),
        (snapshot) => {
          return setComments(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        }
      )
    getComments()
  }, [firebaseDb, animeId])

  return (
    <>
      <div className="comments">
        {comments.map((comment) => {
          return (
            <AnimeComment
              comment={comment}
              key={comment.id}
              animeId={animeId}
            />
          )
        })}
      </div>

      {user?.uid && (
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
      )}
    </>
  )
}
