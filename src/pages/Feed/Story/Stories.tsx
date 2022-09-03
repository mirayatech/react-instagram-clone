import { AnimeCharacters } from '../../../library/AnimeCharacters'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import '/src/styles/stories.css'
import { Story } from './Story'
import { useRef } from 'react'

export function Stories() {
  const sliderRef = useRef<any>(null)

  const slideLeft = () => {
    let slider = sliderRef.current
    slider.scrollLeft = slider.scrollLeft - 100
  }
  const slideRight = () => {
    let slider = sliderRef.current
    slider.scrollLeft = slider.scrollLeft + 100
  }

  return (
    <div className="stories" ref={sliderRef}>
      <button onClick={slideLeft} className="story__button left">
        <IoIosArrowBack />
      </button>
      {AnimeCharacters.map((story, idx) => (
        <Story story={story} key={idx} />
      ))}
      <button onClick={slideRight} className="story__button right">
        <IoIosArrowForward />{' '}
      </button>
    </div>
  )
}
