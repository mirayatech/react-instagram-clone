import './Login.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import AnimePicture from '../../Assets/images/image.png'
import { useAuthContext } from '../../context/AuthContext'
import { PrimaryFooter } from '../../exportFiles'
import { googleSignIn } from '../../library/firebase'

export function Login() {
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user != null) {
      navigate('/')
    }
  }, [user])

  return (
    <>
      <div className="login">
        <img
          src={AnimePicture}
          alt="Instagram logo and Nezuko"
          className="login__picture"
        />

        <div className="login__form">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
            alt="Instagram logo"
            className="login__logo"
          />

          <p tabIndex={0} className="login__info">
            Sign in with Google to see what your favorite Demon Slayer
            characters have posted. Like their posts, comment on their posts and
            upload your own posts.
          </p>

          <button onClick={handleGoogleSignIn} className="login__button">
            Sign in with Google
          </button>
        </div>
      </div>
      <PrimaryFooter />
    </>
  )
}
