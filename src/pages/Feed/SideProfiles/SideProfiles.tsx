import './SideProfile.css'
import type { CollectionReference } from 'firebase/firestore'

import { collection, onSnapshot } from 'firebase/firestore'
import { useState, useEffect } from 'react'

import { useAuthContext } from '../../../context/AuthContext'
import { SecondaryFooter } from '../../../exportFiles'
import { firebaseDb, logOut } from '../../../library/firebase'
import { SideProfile } from './SideProfile'
import { SideProfileSkeleton } from './skeleton/SideProfileSkeleton'

export type SideProfiles = {
  info: string
  picture: string
  username: string
  profileId: string
}

export function SideProfiles() {
  const { user } = useAuthContext()
  const [isLoading, setIsLoading] = useState(true)

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
      setIsLoading(false)
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
        <img src={user?.photoURL || undefined} alt="your profile" />

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

      {isLoading && <SideProfileSkeleton />}
      {/* <SideProfileSkeleton /> */}

      {profiles.map((profile) => {
        return <SideProfile profile={profile} key={profile.profileId} />
      })}
      <SecondaryFooter />
    </div>
  )
}
