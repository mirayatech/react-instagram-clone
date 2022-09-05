import '../../styles/Modal.css'
import { FiX } from 'react-icons/fi'
import { IoCameraOutline } from 'react-icons/io5'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import {
  firebaseAuth,
  firebaseDb,
  firebaseStorage,
} from '../../library/firebase'
import { ref, getDownloadURL, uploadString } from 'firebase/storage'

type ModalProps = {
  closeModal: () => void
}

export function Modal({ closeModal }: ModalProps) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const filePickerRef = useRef(null)
  const captionRef = useRef(null)

  const uploadPost = async () => {
    if (loading) return
    setLoading(true)

    const docReference = await addDoc(collection(firebaseDb, 'posts'), {
      userId: firebaseAuth.currentUser?.uid,
      username: firebaseAuth.currentUser?.displayName,
      caption: captionRef.current.value,
      profileImg: firebaseAuth.currentUser?.photoURL,
      timestamp: serverTimestamp(),
    })

    console.log('New doc added with ID', docReference.id)

    const imageReference = ref(
      firebaseStorage,
      `posts/${docReference.id}/image`
    )

    await uploadString(imageReference, selectedFile, 'data_url').then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageReference)

        await updateDoc(doc(firebaseDb, 'posts', docReference.id), {
          image: downloadURL,
        })
      }
    )

    closeModal()
    setLoading(false)
    setSelectedFile(null)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result)
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            delay: 0.2,
          },
        },
      }}
      className="overlay"
    >
      <button className="close__btn" onClick={closeModal}>
        <FiX />
      </button>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            scale: 0.8,
            opacity: 0,
          },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              delay: 0.4,
            },
          },
        }}
        className="modal"
      >
        {selectedFile ? (
          <div className="modal__img" onClick={() => setSelectedFile(null)}>
            <img src={selectedFile} />
          </div>
        ) : (
          <div onClick={() => filePickerRef.current.click()}>
            <IoCameraOutline className="modal__svg" />{' '}
            <input
              className="modal__file--btn"
              type="file"
              ref={filePickerRef}
              onChange={addImageToPost}
              hidden
            />
          </div>
        )}

        <div className="modal__wrapper">
          <h1>Upload new post</h1>
          <input
            type="text"
            ref={captionRef}
            className="modal__caption"
            placeholder="Please enter a caption..."
          />
          <button onClick={uploadPost} className="upload-post__btn">
            {loading ? 'Uploading...' : 'Upload Post'}
          </button>{' '}
        </div>
      </motion.div>
    </motion.div>
  )
}
