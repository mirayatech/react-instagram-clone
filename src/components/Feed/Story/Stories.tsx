import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Profiles } from '../../../data/profile'
import { Story } from './Story'
import '/src/styles/stories.css'
export function Stories() {
  return (
    <div className="stories">
      <button className="scroll__btn left">
        <IoIosArrowBack />
      </button>
      {Profiles.map((profile, id) => (
        <div>
          <Story profile={profile} key={id} />
        </div>
      ))}
      <button className="scroll__btn left">
        <IoIosArrowForward />{' '}
      </button>
    </div>
  )
}
