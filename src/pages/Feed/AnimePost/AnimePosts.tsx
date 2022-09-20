import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useState, useEffect } from 'react'

import { firebaseDb } from '../../../library/firebase'
import '../../../styles/Posts.css'
import '../../../styles/utilities.css'
import { AnimePost } from './AnimePost'

type AnimePostType = {
  animeId: string
  caption: string
  picture: string
  post: string
  username: string
}

export function AnimePosts() {
  const [animePost, setAnimePost] = useState<AnimePostType[]>([])
  const animePostsCollectionReference = collection(
    firebaseDb,
    'profiles'
  ) as CollectionReference<AnimePostType>

  useEffect(() => {
    const getAnimePost = () => {
      onSnapshot(animePostsCollectionReference, (snapshot) => {
        setAnimePost(
          snapshot.docs.map((doc) => ({ ...doc.data(), animeId: doc.id }))
        )
      })
    }
    getAnimePost()
  }, [firebaseDb])

  return (
    <div className="posts">
      {animePost.map(({ animeId, caption, picture, post, username }) => {
        return (
          <AnimePost
            key={animeId}
            animeId={animeId}
            caption={caption}
            picture={picture}
            post={post}
            username={username}
          />
        )
      })}
    </div>
  )
}
