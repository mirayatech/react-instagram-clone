import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../../../context/context'
import { firebaseAuth } from '../../../library/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'
import '/src/styles/SideProfile.css'

export function SideProfile() {
  const { logOut } = useUserAuth()

  const [currentUserProfile, setCurrentUserProfile] = useState({
    photoURL: '',
    displayName: '',
  })

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logOut()
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
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
          <p className="username">{currentUserProfile.displayName}</p>
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

        <div className="profile">
          <img
            src="https://avatarfiles.alphacoders.com/235/thumb-235828.png"
            alt="Mitsuki profile picture"
          />
          <div className="profile--info">
            <p className="username">mitsuki__official</p>
            <p>Followed by uzumaki_boruto</p>
          </div>
          <button>Follow</button>
        </div>

        <div className="profile">
          <img
            src="https://bestprofilepictures.com/wp-content/uploads/2021/06/Zenitsu-Profile-Pic.jpg"
            alt="Mitsuki profile picture"
          />
          <div className="profile--info">
            <p className="username">zenitsu</p>
            <p>Followed by tanjiro + 1 more</p>
          </div>
          <button>Follow</button>
        </div>

        <div className="profile">
          <img
            src="https://i.pinimg.com/736x/59/b3/56/59b3569f24106c678148d1ecaec16f08.jpg"
            alt="Mitsuki profile picture"
          />
          <div className="profile--info">
            <p className="username">levi_ackerman</p>
            <p>Follows you</p>
          </div>
          <button>Follow</button>
        </div>

        <div className="profile">
          <img
            src="https://i.pinimg.com/originals/4d/6c/a5/4d6ca51b0ff1524f1f791ef3f646a921.jpg"
            alt="Mitsuki profile picture"
          />
          <div className="profile--info">
            <p className="username">suzune_horikita</p>
            <p>New to Instagram</p>
          </div>
          <button>Follow</button>
        </div>

        <div className="profile">
          <img
            src="https://avatarfiles.alphacoders.com/178/178573.jpg"
            alt="Mitsuki profile picture"
          />
          <div className="profile--info">
            <p className="username">sasuke_uchiha</p>
            <p>Followed by tanjiro + 5 more</p>
          </div>
          <button>Follow</button>
        </div>
      </div>
    </div>
  )
}
