import { Profiles } from '../../../data/profile'
import { Post } from './Post'

export function Posts() {
  return (
    <div>
      {Profiles.map((profile, id) => {
        return <Post profile={profile} key={id} />
      })}
    </div>
  )
}
