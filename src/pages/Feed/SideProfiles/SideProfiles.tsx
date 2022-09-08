import { Link, useNavigate } from 'react-router-dom'
import { firebaseAuth, firebaseDb } from '../../../library/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { SecondaryFooter } from '../../../exportFiles'
import { useState, useEffect } from 'react'
import { SideProfile } from './SideProfile'
import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'

type SideProfiles = {
  username: string
  picture: string
  info: string
  profileId: string
}

export function SideProfiles() {
  const [profiles, setProfiles] = useState<SideProfiles[]>([])
  const [currentUserProfile, setCurrentUserProfile] = useState({
    photoURL: '',
    displayName: '',
  })

  const profilesCollectionReference = collection(
    firebaseDb,
    'sideProfiles'
  ) as CollectionReference<SideProfiles>

  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(firebaseAuth).then(() => {
      navigate('/')
    })
  }

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

  return (
    <div className="SideProfile">
      <div className="main__profile">
        <img src={currentUserProfile?.photoURL} alt="Your profile picture" />

        <div className="main__profile--info">
          <p className="username">{currentUserProfile?.displayName}</p>
          <p className="light-text">Welcome to instagram</p>
        </div>
        <button className="signOut" onClick={handleLogout}>
          <Link to="/login"> Sign Out</Link>
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
