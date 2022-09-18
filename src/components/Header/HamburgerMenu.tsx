import { motion } from 'framer-motion'
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5'

import { useHamburgerMenuContext } from '../../context/HamburgerMenuContext'
import './HamburgerMenu.css'
import { logOut } from '../../library/firebase'

type HamburgerMenuProps = {
  openModal: () => void
}

export function HamburgerMenu({ openModal }: HamburgerMenuProps) {
  const { isOpen, setIsOpen } = useHamburgerMenuContext()

  const openHamburgerMenu = () => {
    setIsOpen(true)
  }

  const openHamburgerModal = () => {
    openModal()
    setIsOpen(false)
  }

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
    setIsOpen(false)
  }

  return (
    <div className="hamburger-menu">
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
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 0.8,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.1,
              },
            },
          }}
          className="menu"
        >
          <button onClick={handleSignOut}>Sign out</button>
          <button onClick={openHamburgerModal}>Upload a post</button>
        </motion.div>
      ) : (
        ''
      )}
    </div>
  )
}
