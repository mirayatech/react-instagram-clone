import { Header } from '../../exportFiles'
import { Modal } from '../../components/UploadPost/Modal'
import { SideProfile } from './Side-Profile/SideProfile'
import { Stories } from './Story/Stories'
import { Posts } from './Post/Posts'
import { useState } from 'react'
import '/src/styles/Feed.css'
export function Feed() {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
    console.log('open modal')
  }

  const closeModal = () => {
    setIsOpen(false)
    console.log('close modal')
  }

  return (
    <div className="feed">
      {isOpen === true ? <Modal closeModal={closeModal} /> : ''}

      <Header openModal={openModal} />
      <div className="feed__container">
        <section className="feed__wrapper">
          <Stories />

          <Posts />
        </section>

        <aside className="feed__profile">
          <SideProfile />
        </aside>
      </div>
    </div>
  )
}
