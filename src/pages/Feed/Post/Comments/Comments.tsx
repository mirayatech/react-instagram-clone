import '../../../../styles/Comments.css'
import '../../../../styles/utilities.css'

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
import { Comment } from './Comment'

export type CommentType = {
  comment: string
  profile: string | null
  commentId: string
  profileImage: string | null
  commentUserId: string
  timestamp: { seconds: number; nanoseconds: number }
}

type CommentsProps = {
  postId: string
}

export function Comments({ postId }: CommentsProps) {
  const { user } = useAuthContext()

  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<CommentType[]>([])

  const commentsCollectionReference = collection(
    firebaseDb,
    `posts/${postId}/comments`
  ) as CollectionReference<CommentType>

  const sendComment = async () => {
    const commentToSend = comment
    setComment('')

    if (firebaseAuth.currentUser) {
      await addDoc(commentsCollectionReference, {
        comment: commentToSend,
        commentUserId: firebaseAuth.currentUser.uid,
        profile: firebaseAuth.currentUser.displayName,
        profileImage: firebaseAuth.currentUser.photoURL,
        timestamp: serverTimestamp(),
        commentId: '',
      })
    }
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
  }, [firebaseDb, postId])

  return (
    <>
      <div className="comments">
        {comments.map((comment) => {
          return (
            <Comment
              comment={comment}
              postId={postId}
              key={comment.commentId}
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
            aria-label="post comment"
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
