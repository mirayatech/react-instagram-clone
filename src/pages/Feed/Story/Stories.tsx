import { useRef } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

import './stories.css'
import { stories } from '../../../library/stories'
import { Story } from './Story'
export type StoryType = {
  username: string
  profile: string
}

export function Stories() {
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

  return (
    <div className="stories" ref={sliderRef}>
      <button
        onClick={slideLeft}
        className="story__button left"
        aria-label="Slide left"
      >
        <IoIosArrowBack />
      </button>
      {stories.map((story) => {
        return <Story story={story} key={story.username} />
      })}
      <button
        onClick={slideRight}
        className="story__button right"
        aria-label="Slide right"
      >
        <IoIosArrowForward />
      </button>
    </div>
  )
}
