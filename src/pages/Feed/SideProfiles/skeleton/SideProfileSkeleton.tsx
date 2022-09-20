import Skeleton from 'react-loading-skeleton'
import './SideProfileSkeleton.css'

export function SideProfileSkeleton() {
  return (
    <>
      <div className="profile-skeleton">
        <Skeleton
          circle
          width={37}
          height={37}
          className="profile-skeleton__image"
        />
        <Skeleton count={1} className="profile-skeleton__username" />
      </div>
      <div className="profile-skeleton">
        <Skeleton
          circle
          width={37}
          height={37}
          className="profile-skeleton__image"
        />
        <Skeleton count={1} className="profile-skeleton__username" />
      </div>
      <div className="profile-skeleton">
        <Skeleton
          circle
          width={37}
          height={37}
          className="profile-skeleton__image"
        />
        <Skeleton count={1} className="profile-skeleton__username" />
      </div>
      <div className="profile-skeleton">
        <Skeleton
          circle
          width={37}
          height={37}
          className="profile-skeleton__image"
        />
        <Skeleton count={1} className="profile-skeleton__username" />
      </div>
      <div className="profile-skeleton">
        <Skeleton
          circle
          width={37}
          height={37}
          className="profile-skeleton__image"
        />
        <Skeleton count={1} className="profile-skeleton__username" />
      </div>
    </>
  )
}
