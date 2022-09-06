import { Post } from './Post'
import { useEffect, useState } from 'react'
import { firebaseDb } from '../../../library/firebase'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  CollectionReference,
} from 'firebase/firestore'

type Post = {
  postId: string
  caption: string
  userImage: string
  image: string
  username: string
  postUserId: string
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
        setPosts(
          snapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id }))
        )
      }
    )

    return () => {
      unsubscribe()
    }
  }, [firebaseDb])

  return (
    <div className="posts">
      {posts.map(
        ({ username, userImage, caption, image, postId, postUserId }) => {
          return (
            <Post
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
    </div>
  )
}
