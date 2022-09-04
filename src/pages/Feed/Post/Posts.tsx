import { Post } from './Post'
import { useEffect, useState } from 'react'
import { firebaseDb } from '../../../library/firebase'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  CollectionReference,
  doc,
} from 'firebase/firestore'

type Post = {
  id: string
  caption: string
  profileImg: string
  image: string
  username: string
}

export function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const postsCollectionReference = collection(
    firebaseDb,
    'posts'
  ) as CollectionReference<Post>

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(postsCollectionReference, orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }
    )

    return () => {
      unsubscribe()
    }
  }, [firebaseDb])

  return (
    <div className="posts">
      {posts.map(({ username, profileImg, caption, image, id }) => {
        return (
          <Post
            id={id}
            username={username}
            profileImg={profileImg}
            caption={caption}
            image={image}
            key={id}
          />
        )
      })}
    </div>
  )
}
