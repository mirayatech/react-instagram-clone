import { Feed, Login, Home, Header, Modal } from './exportFiles'
import { Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { Protected } from './components/Protected'
import { useState } from 'react'
import { HamburgerMenuContextProvider } from './context/HamburgerMenuContext'

export function App(): JSX.Element {
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
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/feed"
              element={
                <Protected>
                  <Feed />
                </Protected>
              }
            />
          </Routes>
        </HamburgerMenuContextProvider>
      </AuthContextProvider>
    </div>
  )
}
