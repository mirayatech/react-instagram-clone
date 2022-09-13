import { useState } from 'react'
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5'
import { UserAuth } from '../../context/AuthContext'

export function HamburgerMenu() {
  const { logOut } = UserAuth()
  const [openMenu, setOpenMenu] = useState(false)

  const openHamburgerMenu = () => {
    setOpenMenu(true)
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
      {openMenu ? (
        <button onClick={() => setOpenMenu(false)} className="bars">
          <IoCloseOutline />
        </button>
      ) : (
        <button onClick={openHamburgerMenu} className="bars">
          <IoMenuOutline />
        </button>
      )}

      {openMenu === true ? (
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
