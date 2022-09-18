import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { AuthContextProvider } from './context/AuthContext'
import { HamburgerMenuContextProvider } from './context/HamburgerMenuContext'
import { Feed, Login, Header, Modal } from './exportFiles'

export function App() {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
    console.log('open modal')
  }

  const closeModal = () => {
    setIsOpen(false)
    console.log('close modal')
  }

  return (
    <div>
      <AuthContextProvider>
        <HamburgerMenuContextProvider>
          {isOpen === true ? <Modal closeModal={closeModal} /> : ''}

          <Header openModal={openModal} />
          <Routes>
            {' '}
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </HamburgerMenuContextProvider>
      </AuthContextProvider>
    </div>
  )
}
