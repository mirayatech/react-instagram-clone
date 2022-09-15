import { UsersPosts } from './UserPosts/UsersPosts'
import { DemonSlayerPosts } from './DemonSlayerPosts/DemonSlayerPosts'
import { useEffect, useState } from 'react'
import { firebaseDb } from '../../library/firebase'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  CollectionReference,
} from 'firebase/firestore'

import './Home.css'

type UsersPost = {
  postId: string
  caption: string
  userImage: string
  image: string
  username: string
  postUserId: string
}

type CharactersPost = {
  animeId: string
  caption: string
  picture: string
  post: string
  username: string
}

export function Home() {
  const [usersPosts, setUsersPosts] = useState<UsersPost[]>([])
  const [charactersPosts, setCharactersPosts] = useState<CharactersPost[]>([])

  const postsCollectionReference = collection(
    firebaseDb,
    'posts'
  ) as CollectionReference<UsersPost>

  const animePostsCollectionReference = collection(
    firebaseDb,
    'profiles'
  ) as CollectionReference<CharactersPost>

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(postsCollectionReference, orderBy('timestamp', 'desc')),
      (snapshot) => {
        setUsersPosts(
          snapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id }))
        )
      }
    )

    return () => {
      unsubscribe()
    }
  }, [firebaseDb])

  useEffect(() => {
    const getAnimePost = () => {
      onSnapshot(animePostsCollectionReference, (snapshot) => {
        setCharactersPosts(
          snapshot.docs.map((doc) => ({ ...doc.data(), animeId: doc.id }))
        )
      })
    }
    getAnimePost()
  }, [firebaseDb])

  return (
    <div className="home">
      {usersPosts.map(
        ({ username, userImage, caption, image, postId, postUserId }) => {
          return (
            <UsersPosts
              postUserId={postUserId}
              postId={postId}
              username={username}
              userImage={userImage}
              caption={caption}
              image={image}
              key={postId}
            />
          )
        }
      )}

      {charactersPosts.map(({ animeId, caption, picture, post, username }) => {
        return (
          <DemonSlayerPosts
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
