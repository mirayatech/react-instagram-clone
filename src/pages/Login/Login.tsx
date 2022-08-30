import '../../styles/Login.css'
import { GrGoogle } from 'react-icons/gr'

export function Login() {
  return (
    <div className="Login">
      <img
        src="https://betelgeusetech.com/wp-content/uploads/2021/05/instadevice.png"
        alt="Two phones"
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

        <button>
          <GrGoogle className="svg" /> Sign in with Google
        </button>
      </div>
    </div>
  )
}
