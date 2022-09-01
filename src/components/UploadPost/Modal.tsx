import '../../styles/Modal.css'
import { FiX } from 'react-icons/fi'
import { IoImageOutline } from 'react-icons/io5'

type ModalProps = {
  closeModal: () => void
}
export function Modal({ closeModal }: ModalProps) {
  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal__title">
          <h1>Create a new post</h1>

          <button onClick={closeModal}>
            <FiX className="close__btn" />
          </button>
        </div>

        <IoImageOutline className="modal__svg" />

        <div className="modal__wrapper">
          <input
            className="modal__file--btn"
            type="file"
            name="file"
            accept="image/png, image/jpeg"
          />
          <input
            type="text"
            className="modal__caption--btn"
            placeholder="Write a caption..."
          />
        </div>

        <button className="upload-post__btn">Upload Post</button>
      </div>
    </div>
  )
}
