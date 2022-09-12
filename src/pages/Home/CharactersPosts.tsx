import { collection, onSnapshot, CollectionReference } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firebaseDb } from '../../library/firebase'
import { CharactersPostsComments } from './CharactersPostsComments'

type Like = {
  likeId: string
  username: string
}

type AnimePostPropos = {
  animeId: string
  caption: string
  picture: string
  post: string
  username: string
}

export function CharactersPosts({
  animeId,
  caption,
  picture,
  post,
  username,
}: AnimePostPropos) {
  const [likes, setLikes] = useState<Like[]>([])
  const likeCollectionReference = collection(
    firebaseDb,
    'profiles',
    animeId,
    'likes'
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
          <span className="post__post--info">
            <p className="username">{username}</p>
          </span>
        </div>
      </div>

      <img src={post} alt="Instagram post" className="post__image" />

      <div className="post__container">
        <div className="post__likes">
          {likes.length > 0 && <p>{likes.length} likes</p>}
        </div>
        <div className="post__caption">
          <p>
            <span className="thick">{username}</span> {caption}
          </p>
        </div>
        <CharactersPostsComments animeId={animeId} />
      </div>
    </div>
  )
}
