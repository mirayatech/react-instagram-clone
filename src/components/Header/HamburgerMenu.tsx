import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5'
import { UserAuth } from '../../context/AuthContext'
import { MenuPopup } from '../../context/HamburgerMenuContext'
export function HamburgerMenu() {
  const { logOut } = UserAuth()
  const { isOpen, setIsOpen } = MenuPopup()

  const openHamburgerMenu = () => {
    setIsOpen(true)
  }

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="HamburgerMenu">
      {isOpen ? (
        <button onClick={() => setIsOpen(false)} className="bars">
          <IoCloseOutline />
        </button>
      ) : (
        <button onClick={openHamburgerMenu} className="bars">
          <IoMenuOutline />
        </button>
      )}

      {isOpen === true ? (
        <div className="menu">
          <button onClick={handleSignOut}>Sign out</button>
          <button>Upload a post</button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
