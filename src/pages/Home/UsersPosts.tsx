import { collection, onSnapshot, CollectionReference } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firebaseDb } from '../../library/firebase'
import { UsersPostsComments } from './UsersPostsComments'

type Like = {
  likeId: string
  username: string
}

type PostProps = {
  image: string
  postId: string
  caption: string
  username: string
  userImage: string
  postUserId: string
}

export function UsersPosts({
  image,
  postId,
  caption,
  username,
  userImage,
  postUserId,
}: PostProps) {
  const [likes, setLikes] = useState<Like[]>([])
  const likeCollectionReference = collection(
    firebaseDb,
    'posts',
    postId,
    'likes'
  ) as CollectionReference<Like>

  useEffect(
    () =>
      onSnapshot(likeCollectionReference, (snapshot) =>
        setLikes(
          snapshot.docs.map((doc) => ({ ...doc.data(), likeId: doc.id }))
        )
      ),
    [firebaseDb, postId]
  )

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__header--wrapper">
          <img src={userImage} alt={username} />
          <span className="post__post--info">
            <p className="username">{username}</p>
          </span>
        </div>
      </div>

      <img src={image} alt="Instagram post" className="post__image" />

      <div className="post__container">
        <div className="post__likes">
          {likes.length > 0 && <p>{likes.length} likes</p>}
        </div>
        <div className="post__caption">
          <p>
            <span className="thick">{username}</span> {caption}
          </p>
        </div>
        <UsersPostsComments postId={postId} />
      </div>
    </div>
  )
}
