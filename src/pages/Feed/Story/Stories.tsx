import { useRef } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Story } from './Story'
import '/src/styles/stories.css'
import { useEffect, useState } from 'react'
import { firebaseDb } from '../../../library/firebase'
import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'

type Story = {
  caption: string
  id: string
  likes: number
  location: string
  picture: string
  post: string
  username: string
}

export function Stories() {
  const [stories, setStories] = useState<Story[]>([])
  const postsCollectionReference = collection(
    firebaseDb,
    'profiles'
  ) as CollectionReference<Story>

  const sliderRef = useRef<any>(null)

  const slideLeft = () => {
    let slider = sliderRef.current
    slider.scrollLeft = slider.scrollLeft - 100
  }
  const slideRight = () => {
    let slider = sliderRef.current
    slider.scrollLeft = slider.scrollLeft + 100
  }

  useEffect(() => {
    const getStories = () =>
      onSnapshot(postsCollectionReference, (snapshot) =>
        setStories(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      )
    getStories()
  }, [])
  return (
    <div className="stories" ref={sliderRef}>
      <button onClick={slideLeft} className="story__button left">
        <IoIosArrowBack />
      </button>
      {stories.map((story) => (
        <Story story={story} key={story.id} />
      ))}
      <button onClick={slideRight} className="story__button right">
        <IoIosArrowForward />{' '}
      </button>
    </div>
  )
}
