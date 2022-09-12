import { Link } from 'react-router-dom'
import { firebaseAuth, firebaseDb } from '../../../library/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { SecondaryFooter } from '../../../exportFiles'
import { useState, useEffect } from 'react'
import { SideProfile } from './SideProfile'
import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'
import { UserAuth } from '../../../context/AuthContext'

type SideProfiles = {
  username: string
  picture: string
  info: string
  profileId: string
}

export function SideProfiles() {
  const { user, logOut } = UserAuth()

  const [profiles, setProfiles] = useState<SideProfiles[]>([])
  const [currentUserProfile, setCurrentUserProfile] = useState({
    photoURL: '',
    displayName: '',
  })

  const profilesCollectionReference = collection(
    firebaseDb,
    'sideProfiles'
  ) as CollectionReference<SideProfiles>

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      return setCurrentUserProfile(currentUser)
    })
  }, [])

  useEffect(() => {
    const getSideProfiles = () => {
      onSnapshot(profilesCollectionReference, (snapshot) =>
        setProfiles(
          snapshot.docs.map((doc) => ({ ...doc.data(), profileId: doc.id }))
        )
      )
    }
    getSideProfiles()
  }, [])

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="SideProfile">
      <div className="main__profile">
        <img src={currentUserProfile?.photoURL} alt="Your profile picture" />

        <div className="main__profile--info">
          <p className="username">{currentUserProfile?.displayName}</p>
          <p className="light-text">Welcome to instagram</p>
        </div>
        <button className="signOut" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>

      <div className="suggestions">
        <div className="suggestions__intro">
          <p>Suggestions for you</p> <p>See All</p>
        </div>
      </div>

      {profiles.map(({ username, picture, info, profileId }) => {
        return (
          <SideProfile
            username={username}
            picture={picture}
            info={info}
            profileId={profileId}
            key={profileId}
          />
        )
      })}
      <SecondaryFooter />
    </div>
  )
}
