import '../../styles/Login.css'
import { GrGoogle } from 'react-icons/gr'
import { Footer } from '../../exportFiles'
import { signInWithPopup } from 'firebase/auth'
import { firebaseAuth, googleAuthProvider } from '../../library/firebase'
import AnimePicture from '../../images/anime.png'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const navigate = useNavigate()
  const signInWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, googleAuthProvider).then(() =>
      navigate('/home')
    )
  }
  return (
    <>
      <div className="Login">
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

          <p>
            Sign in with Google to see what your favorite anime characters have
            posted. Like their posts, comment on their posts and upload your own
            posts.
          </p>

          <button onClick={signInWithGoogle}>
            <GrGoogle className="svg" /> Sign in with Google
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}
