import { AnimePost } from './AnimePost'
import { useEffect, useState } from 'react'
import { firebaseDb } from '../../../library/firebase'
import { collection, onSnapshot, CollectionReference } from 'firebase/firestore'

type AnimePost = {
  picture: string
  caption: string
  username: string
  post: string
  animeId: string
}

export function AnimePosts() {
  const [animePosts, setAnimePosts] = useState<AnimePost[]>([])
  const animePostCollectionReference = collection(
    firebaseDb,
    'profiles'
  ) as CollectionReference<AnimePost>

  useEffect(() => {
    const unsubscribe = onSnapshot(animePostCollectionReference, (snapshot) => {
      setAnimePosts(
        snapshot.docs.map((doc) => ({ ...doc.data(), animeId: doc.id }))
      )
    })

    return () => {
      unsubscribe()
    }
  }, [firebaseDb])

  return (
    <div className="posts">
      {animePosts.map(({ username, picture, caption, post, animeId }) => {
        return (
          <AnimePost
            //   animeId={animeId}
            username={username}
            picture={picture}
            caption={caption}
            post={post}
            key={animeId}
            animeId={animeId}
          />
        )
      })}
    </div>
  )
}
