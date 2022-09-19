import { useAuthContext } from '../../context/AuthContext'
import { AnimePosts } from './AnimePost/AnimePosts'
import { Posts } from './Post/Posts'
import { SideProfiles } from './SideProfiles/SideProfiles'
import { Stories } from './Story/Stories'
import './Feed.css'
export function Feed() {
  const { user } = useAuthContext()
  return (
    <div className="feed">
      <div className="feed__container">
        <section className="feed__wrapper">
          {user?.uid && <Stories />}
          <Posts />
          <AnimePosts />
        </section>

        {user?.uid && (
          <aside className="feed__profile">
            <SideProfiles />
          </aside>
        )}
      </div>
    </div>
  )
}
