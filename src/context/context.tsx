import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { firebaseAuth, firebaseDb } from '../library/firebase'

const userAuthContext = createContext()

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({})

  //   function logIn(email, password) {
  //     return signInWithEmailAndPassword(auth, email, password)
  //   }

  function logOut() {
    return signOut(firebaseAuth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentuser) => {
      console.log('Auth', currentuser)
      setUser(currentuser)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <userAuthContext.Provider value={{ user, logOut }}>
      {children}
    </userAuthContext.Provider>
  )
}

export function useUserAuth() {
  return useContext(userAuthContext)
}
