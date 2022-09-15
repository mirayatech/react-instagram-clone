import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { firebaseDb } from '../../../library/firebase'
import { useRef, useEffect, useState } from 'react'
import { Story } from './Story'
import './stories.css'

type Story = {
  username: string
  storyId: string
  picture: string
  caption: string
  post: string
}

export function Stories() {
  const [stories, setStories] = useState<Story[]>([])
  const sliderRef = useRef(null)

  const slideLeft = () => {
    let slider = sliderRef.current
    slider.scrollLeft = slider.scrollLeft - 100
  }
  const slideRight = () => {
    let slider = sliderRef.current
    slider.scrollLeft = slider.scrollLeft + 100
  }

  const storiesCollectionReference = collection(
    firebaseDb,
    'profiles'
  ) as CollectionReference<Story>

  useEffect(() => {
    const getStories = async () => {
      onSnapshot(storiesCollectionReference, (snapshot) =>
        setStories(
          snapshot.docs.map((doc) => ({ ...doc.data(), storyId: doc.id }))
        )
      )
    }
    getStories()
  }, [])

  return (
    <div className="stories" ref={sliderRef}>
      <button onClick={slideLeft} className="story__button left">
        <IoIosArrowBack />
      </button>
      {stories.map(({ username, picture, storyId }) => {
        return <Story username={username} picture={picture} key={storyId} />
      })}
      <button onClick={slideRight} className="story__button right">
        <IoIosArrowForward />
      </button>
    </div>
  )
}
