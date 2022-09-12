import { firebaseDb } from '../../library/firebase'
import { UsersPostsComment } from './UsersPostsComment'
import { useState, useEffect } from 'react'

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

type CommentsProps = {
  postId: string
}

export function UsersPostsComments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comments[]>([])

  const commentsCollectionReference = collection(
    firebaseDb,
    'posts',
    postId,
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
  }, [firebaseDb, postId])

  return (
    <div className="comments">
      {comments.map(
        ({ profile, profileImage, comment, commentUserId, commentId }) => {
          return (
            <UsersPostsComment
              postId={postId}
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
