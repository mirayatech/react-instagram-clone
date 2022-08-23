import '/src/styles/Header.css'

import {
  HiOutlinePaperAirplane,
  HiOutlinePlusCircle,
  HiOutlineSearch,
  HiOutlineHeart,
} from 'react-icons/hi'

import { GrHomeRounded } from 'react-icons/gr'

export function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
          alt="Instagram logo"
        />
      </div>

      <div className="header__nav">
        <GrHomeRounded className="header__nav--icon home" />
        <HiOutlinePaperAirplane className="header__nav--icon plane" />
        <button className="upload__button">
          <HiOutlinePlusCircle className="header__nav--icon" />
        </button>
        <HiOutlineSearch className="header__nav--icon" />{' '}
        <HiOutlineHeart className="header__nav--icon" />
        <img
          className="profile__picture"
          src="https://pbs.twimg.com/profile_images/1336080903995416577/LYMVFS40_400x400.jpg"
          alt="profile picture"
        />
      </div>
    </header>
  )
}
