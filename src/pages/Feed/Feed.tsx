import { SideProfiles } from './SideProfiles/SideProfiles'
import { AnimePosts } from './AnimePost/AnimePosts'
import { Stories } from './Story/Stories'
import { Posts } from './Post/Posts'
import '/src/styles/Feed.css'
export function Feed() {
  return (
    <div className="feed">
      <div className="feed__container">
        <section className="feed__wrapper">
          <Stories />

          <Posts />
          <AnimePosts />
        </section>

        <aside className="feed__profile">
          <SideProfiles />
        </aside>
      </div>
    </div>
  )
}
