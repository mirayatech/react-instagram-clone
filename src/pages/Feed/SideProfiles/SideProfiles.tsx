import './SideProfile.css'
import { useState, useEffect } from 'react'
import { SideProfile } from './SideProfile'
import { firebaseDb } from '../../../library/firebase'
import { SecondaryFooter } from '../../../exportFiles'
import { UserAuth } from '../../../context/AuthContext'
import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'

type SideProfiles = {
  info: string
  picture: string
  username: string
  profileId: string
}

export function SideProfiles() {
  const { user, logOut } = UserAuth()

  const [profiles, setProfiles] = useState<SideProfiles[]>([])

  const profilesCollectionReference = collection(
    firebaseDb,
    'sideProfiles'
  ) as CollectionReference<SideProfiles>

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
    <div className="side-profiles">
      <div className="main__profile">
        <img src={user?.photoURL} alt="Your profile picture" />

        <div className="main__profile--info">
          <p className="username">{user?.displayName}</p>
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
            info={info}
            key={profileId}
            picture={picture}
            username={username}
            profileId={profileId}
          />
        )
      })}
      <SecondaryFooter />
    </div>
  )
}
