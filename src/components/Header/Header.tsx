import '/src/styles/Header.css'
import {
  HiOutlinePaperAirplane,
  HiOutlinePlusCircle,
  HiOutlineSearch,
  HiOutlineHeart,
} from 'react-icons/hi'
import { UserAuth } from '../../context/AuthContext'
import { GrHomeRounded } from 'react-icons/gr'
import { Link } from 'react-router-dom'

type HeaderProps = {
  openModal: () => void
}

export function Header({ openModal }: HeaderProps) {
  const { user, logOut } = UserAuth()

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className="header">
      <div className="header__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
          alt="Instagram logo"
          tabIndex={1}
        />
      </div>

      {user?.displayName ? (
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
            src={user.photoURL}
            alt="Your profile picture"
          />{' '}
          <button className="signOut nav" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <Link to="/login" className="link__btn">
          Sign In
        </Link>
      )}
    </header>
  )
}
