import '/src/styles/Header.css'
import {
  HiHome,
  HiOutlinePaperAirplane,
  HiOutlineHeart,
  HiOutlineSearch,
} from 'react-icons/hi'
import { FiPlusSquare } from 'react-icons/fi'
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
        <HiHome className="header__nav--icon" />
        <HiOutlinePaperAirplane className="header__nav--icon" />
        <button className="upload__button">
          <FiPlusSquare className="header__nav--icon" />
        </button>
        <HiOutlineHeart className="header__nav--icon" />
        <HiOutlineSearch className="header__nav--icon" />
      </div>
    </header>
  )
}
