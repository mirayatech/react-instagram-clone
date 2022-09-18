import { GrHomeRounded } from 'react-icons/gr'
import {
  HiOutlinePaperAirplane,
  HiOutlinePlusCircle,
  HiOutlineSearch,
  HiOutlineHeart,
} from 'react-icons/hi'
import { Link } from 'react-router-dom'

import './Header.css'
import '../../styles/utilities.css'

import { useAuthContext } from '../../context/AuthContext'
import { HamburgerMenu } from './HamburgerMenu'

type HeaderProps = {
  openModal: () => void
}

export function Header({ openModal }: HeaderProps) {
  const { user } = useAuthContext()

  return (
    <header className="header">
      <div className="header__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
          alt="Instagram logo"
          tabIndex={1}
        />
      </div>

      {user?.uid ? (
        <aside className="header__wrapper">
          <HamburgerMenu openModal={openModal} />
          <div className="wrapper">
            <GrHomeRounded className="wrapper__icon house" />
            <HiOutlinePaperAirplane className="wrapper__icon plane" />
            <button
              className="upload__button"
              aria-label="upload post"
              onClick={openModal}
              tabIndex={1}
            >
              <HiOutlinePlusCircle className="wrapper__icon" />
            </button>
            <HiOutlineSearch className="wrapper__icon" />{' '}
            <HiOutlineHeart className="wrapper__icon" />
          </div>
          <img
            className="wrapper__profile"
            src={user.photoURL || ''}
            alt="Your profile picture"
          />
        </aside>
      ) : (
        <Link to="/login" className="wrapper__btn">
          Sign In
        </Link>
      )}
    </header>
  )
}
