import { Stories } from './Story/Stories'
import { Posts } from './Post/Posts'
import '/src/styles/Feed.css'
export function Feed() {
  return (
    <div className="feed">
      <Stories />

      <Posts />

      {/* Mini Profile */}
    </div>
  )
}
