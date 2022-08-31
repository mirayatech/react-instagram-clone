import { Feed, Login } from './exportFiles'
import { Routes, Route } from 'react-router-dom'
import { UserAuthContextProvider } from './context/context'
import { ProtectedRoute } from './components/ProtectedRoute'
import { onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { firebaseAuth } from './library/firebase'

export default function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(true)

  // useEffect(() => {
  //   onAuthStateChanged(firebaseAuth, (currentUser) => {
  //     if (currentUser) {
  //       return setIsUserSignedIn(true)
  //     } else {
  //       setIsUserSignedIn(false)
  //     }
  //   })
  // }, [])

  return (
    <UserAuthContextProvider>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </UserAuthContextProvider>
  )
}
