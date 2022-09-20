import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
}

const app = initializeApp(firebaseConfig)

const firebaseStorage = getStorage(app)
const firebaseDb = getFirestore(app)
const firebaseAuth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider()

export const googleSignIn = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(firebaseAuth, provider)
}

export const logOut = () => {
  signOut(firebaseAuth)
}

export { firebaseStorage, firebaseDb, firebaseAuth, googleAuthProvider }
