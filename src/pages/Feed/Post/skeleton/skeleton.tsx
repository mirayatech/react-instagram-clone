import './skeleton.css'
import '../../../../styles/Posts.css'
import '../../../../styles/Comments.css'
import '../../../../styles/utilities.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function PostSkeleton() {
  return (
    <div className=" skeleton">
      <div className="skeleton__header">
        <Skeleton circle width={37} height={37} />
        <Skeleton count={1} className="username" />
      </div>
      <Skeleton count={1} height={300} className="skeleton__image" />
      <div className="skeleton__container">
        <div className="skeleton__actions">
          <div className="skeleton__actions--wrapper">
            <Skeleton circle width={30} height={30} className="buttons first" />
            <Skeleton circle width={30} height={30} className="buttons" />{' '}
            <Skeleton circle width={30} height={30} className="buttons" />
          </div>
          <Skeleton circle width={30} height={30} />
        </div>
      </div>{' '}
      <div className="skeleton__footer">
        <Skeleton count={3} className="footer" />
      </div>
    </div>
  )
}
