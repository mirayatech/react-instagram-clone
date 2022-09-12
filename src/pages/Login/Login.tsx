import '../../styles/Login.css'
import { GrGoogle } from 'react-icons/gr'
import { PrimaryFooter } from '../../exportFiles'
import { useEffect } from 'react'
import AnimePicture from '../../images/image1.png'
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const { googleSignIn, user } = UserAuth()
  const navigate = useNavigate()

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
          alt="Animated girl"
          className="login__picture"
        />

        <div className="login__form">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
            alt="Instagram logo"
          />

          <p tabIndex={1}>
            Sign in with Google to see what your favorite Demon Slayer
            characters have posted. Like their posts, comment on their posts and
            upload your own posts.
          </p>

          <button onClick={handleGoogleSignIn} tabIndex={1}>
            <GrGoogle className="svg" /> Sign in with Google
          </button>
        </div>
      </div>
      <PrimaryFooter />
    </>
  )
}
