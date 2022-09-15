import './Login.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryFooter } from '../../exportFiles'
import AnimePicture from '../../Assets/images/image1.png'
import { UserAuth } from '../../context/AuthContext'

export function Login() {
  const navigate = useNavigate()
  const { googleSignIn, user } = UserAuth()

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user != null) {
      navigate('/feed')
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

          <p tabIndex={1} className="login__info">
            Sign in with Google to see what your favorite Demon Slayer
            characters have posted. Like their posts, comment on their posts and
            upload your own posts.
          </p>

          <button
            onClick={handleGoogleSignIn}
            tabIndex={1}
            className="login__button"
          >
            Sign in with Google
          </button>
        </div>
      </div>
      <PrimaryFooter />
    </>
  )
}
