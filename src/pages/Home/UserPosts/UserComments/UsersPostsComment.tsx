import { useEffect, useState } from 'react'
import { firebaseDb } from '../../../../library/firebase'
import { CollectionReference, collection, onSnapshot } from 'firebase/firestore'

type Like = {
  postId: string
  likeId: string
  username: string
  commentId: string
}

type CommentsProps = {
  postId: string
  comment: string
  profile: string
  commentId: string
  profileImage: string
  commentUserId: string
}

export function UsersPostsComment({
  postId,
  comment,
  profile,
  commentId,
  profileImage,
}: CommentsProps) {
  const [likesComment, setLikesComment] = useState<Like[]>([])
  const likeCollectionReference = collection(
    firebaseDb,
    `posts/${postId}/comments/${commentId}/likes`
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
