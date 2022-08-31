import { useRef } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Profiles } from '../../../library/profile'
import { Story } from './Story'
import '/src/styles/stories.css'
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
      {Profiles.map((profile, id) => (
        <Story profile={profile} key={id} />
      ))}
      <button onClick={slideRight} className="story__button right">
        <IoIosArrowForward />{' '}
      </button>
    </div>
  )
}
