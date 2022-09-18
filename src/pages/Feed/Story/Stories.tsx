import type { StoryType } from './Story'
import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useRef, useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

import { firebaseDb } from '../../../library/firebase'
import { Story } from './Story'
import './stories.css'

export function Stories() {
  const [stories, setStories] = useState<StoryType[]>([])
  const sliderRef = useRef<HTMLDivElement>(null)

  const slideLeft = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current
      slider.scrollLeft = slider.scrollLeft - 100
    }
  }
  const slideRight = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current
      slider.scrollLeft = slider.scrollLeft + 100
    }
  }

  const storiesCollectionReference = collection(
    firebaseDb,
    'profiles'
  ) as CollectionReference<StoryType>

  useEffect(() => {
    const getStories = async () => {
      onSnapshot(storiesCollectionReference, (snapshot) =>
        setStories(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      )
    }
    return () => {
      getStories()
    }
  }, [])

  return (
    <div className="stories" ref={sliderRef}>
      <button onClick={slideLeft} className="story__button left">
        <IoIosArrowBack />
      </button>
      {stories.map((story) => {
        return <Story story={story} key={story.id} />
      })}
      <button onClick={slideRight} className="story__button right">
        <IoIosArrowForward />
      </button>
    </div>
  )
}
