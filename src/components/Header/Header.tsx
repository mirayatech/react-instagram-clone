import '/src/styles/Header.css'
import { useEffect, useState } from 'react'
import { firebaseAuth } from '../../library/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import {
  HiOutlinePaperAirplane,
  HiOutlinePlusCircle,
  HiOutlineSearch,
  HiOutlineHeart,
} from 'react-icons/hi'

import { GrHomeRounded } from 'react-icons/gr'

type HeaderProps = {
  openModal: () => void
}

export function Header({ openModal }: HeaderProps) {
  const [currentHeaderProfile, setCurrentHeaderProfile] = useState({
    photoURL: '',
  })

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      return setCurrentHeaderProfile(currentUser)
    })
  }, [])

  return (
    <header className="header">
      <div className="header__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
          alt="Instagram logo"
          tabIndex={1}
        />
      </div>

      <div className="header__nav">
        <GrHomeRounded className="header__nav--icon home" />
        <HiOutlinePaperAirplane className="header__nav--icon plane" />
        <button
          className="upload__button"
          aria-label="upload post"
          onClick={openModal}
          tabIndex={1}
        >
          <HiOutlinePlusCircle className="header__nav--icon" />
        </button>
        <HiOutlineSearch className="header__nav--icon" />{' '}
        <HiOutlineHeart className="header__nav--icon" />
        <img
          className="header__profile"
          src={currentHeaderProfile.photoURL}
          alt="Your profile picture"
        />
      </div>
    </header>
  )
}
