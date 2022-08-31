import { FiX, FiImage } from 'react-icons/fi'

type ModalProps = {
  closeModal: () => void
}
export function Modal({ closeModal }: ModalProps) {
  return (
    <div style={{ marginTop: '300px' }} className="overlay">
      <div className="modal">
        <div className="modal__title">
          <h1>Create a new post</h1>

          <button onClick={closeModal}>
            <FiX />
          </button>
        </div>

        <FiImage className="modal__svg" />

        <div className="modal__wrapper">
          <input type="file" name="file" accept="image/png, image/jpeg" />
          <input type="text" />
        </div>

        <button>Upload Post</button>
      </div>
    </div>
  )
}
