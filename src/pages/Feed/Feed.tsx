import { Header } from '../../exportFiles'
import { SideProfile } from './Side-Profile/SideProfile'
import { Stories } from './Story/Stories'
import { Posts } from './Post/Posts'
import '/src/styles/Feed.css'
export function Feed() {
  return (
    <>
      <Header />
      <div className="feed">
        <section className="feed__wrapper">
          <Stories />

          <Posts />
        </section>

        <aside className="feed__profile">
          <SideProfile />
        </aside>
      </div>
    </>
  )
}
