import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'
import { firebaseDb } from '../../../library/firebase'
import { useState, useEffect } from 'react'
import { AnimePost } from './AnimePost'

type A = {
  animeId: string
  caption: string
  picture: string
  post: string
  username: string
}

export function AnimePosts() {
  const [animePost, setAnimePost] = useState<A[]>([])
  const animePostsCollectionReference = collection(
    firebaseDb,
    'profiles'
  ) as CollectionReference<A>

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
