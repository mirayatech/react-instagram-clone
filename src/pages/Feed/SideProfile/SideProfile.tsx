import { Link, useNavigate } from 'react-router-dom'
import { firebaseAuth } from '../../../library/firebase'
import { SideProfiles } from '../../../library/SideProfiles'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { SecondaryFooter } from '../../../exportFiles'
import { useState, useEffect } from 'react'
import '/src/styles/SideProfile.css'

export function SideProfile() {
  const [currentUserProfile, setCurrentUserProfile] = useState({
    photoURL: '',
    displayName: '',
  })

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

        {SideProfiles.map(({ picture, username, suggestions }) => {
          return (
            <div className="profile">
              <img src={picture} alt="profile picture" />
              <div className="profile--info">
                <p className="username">{username}</p>
                <p>{suggestions}</p>
              </div>
              <button>Follow</button>
            </div>
          )
        })}
      </div>
      <SecondaryFooter />
    </div>
  )
}
