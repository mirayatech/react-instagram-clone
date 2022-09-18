import type { CollectionReference } from 'firebase/firestore';

import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { firebaseDb } from '../../../library/firebase'
import { DemonSlayerComments } from './DemonSlayerComments/DemonSlayerComments'
import '../../../styles/Posts.css'
import '../../../styles/Comments.css'

type Like = {
  likeId: string
  username: string
}

type AnimePostPropos = {
  post: string
  animeId: string
  caption: string
  picture: string
  username: string
}

export function DemonSlayerPosts({
  post,
  animeId,
  caption,
  picture,
  username,
}: AnimePostPropos) {
  const [likes, setLikes] = useState<Like[]>([])
  const likeCollectionReference = collection(
    firebaseDb,
    `profiles/${animeId}/likes`
  ) as CollectionReference<Like>

  useEffect(
    () =>
      onSnapshot(likeCollectionReference, (snapshot) =>
        setLikes(
          snapshot.docs.map((doc) => ({ ...doc.data(), likeId: doc.id }))
        )
      ),
    [firebaseDb, animeId]
  )

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__header--wrapper">
          <img src={picture} alt={username} />
          <p className="username">{username}</p>
        </div>
      </div>

      <img src={post} alt="Instagram post" className="post__image" />

      <div className="post__container">
        <div className="post__likes">
          {likes.length > 0 && <p>{likes.length} likes</p>}
        </div>
        <div className="post__caption">
          <p>
            <span className="username thick">{username}</span> {caption}
          </p>
        </div>
        <DemonSlayerComments animeId={animeId} />
      </div>
    </div>
  )
}
