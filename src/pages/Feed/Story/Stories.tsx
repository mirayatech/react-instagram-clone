import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Story } from './Story'
import { useRef, useEffect, useState } from 'react'
import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'
import { firebaseDb } from '../../../library/firebase'

type Story = {
  storyId: string
  username: string
  picture: string
  post: string
  caption: string
}

export function Stories() {
  const [stories, setStories] = useState<Story[]>([])
  const sliderRef = useRef<any>(null)

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
        <IoIosArrowForward />{' '}
      </button>
    </div>
  )
}
