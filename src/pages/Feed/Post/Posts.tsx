import { Post } from './Post'
import { useEffect, useState } from 'react'
import { firebaseDb } from '../../../library/firebase'
import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'

type Post = {
  caption: string
  id: string
  likes: number
  location: string
  picture: string
  post: string
  username: string
}

export function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const postsCollectionReference = collection(
    firebaseDb,
    'profiles'
  ) as CollectionReference<Post>

  useEffect(() => {
    const getPosts = () =>
      onSnapshot(postsCollectionReference, (snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      )
    getPosts()
  }, [])

  return (
    <div className="posts">
      {posts.map((post) => {
        return <Post post={post} key={post.id} />
      })}
    </div>
  )
}
