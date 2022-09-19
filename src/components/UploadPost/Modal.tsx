/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  doc,
  addDoc,
  collection,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { ref, getDownloadURL, uploadString } from 'firebase/storage'
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { FiX } from 'react-icons/fi'
import { IoCameraOutline } from 'react-icons/io5'

import {
  firebaseDb,
  firebaseAuth,
  firebaseStorage,
} from '../../library/firebase'

import './Modal.css'
import '../../styles/utilities.css'

type ModalProps = {
  closeModal: () => void
}

export function Modal({ closeModal }: ModalProps) {
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const filePickerRef = useRef<any>(null)
  const captionRef = useRef<any>(null)

  const uploadPost = async () => {
    if (loading) return
    setLoading(true)

    const documentReference = await addDoc(collection(firebaseDb, 'posts'), {
      postUserId: firebaseAuth.currentUser?.uid,
      username: firebaseAuth.currentUser?.displayName,
      caption: captionRef.current.value,
      userImage: firebaseAuth.currentUser?.photoURL,
      timestamp: serverTimestamp(),
    })

    const imageReference = ref(
      firebaseStorage,
      `posts/${documentReference.id}/image`
    )

    await uploadString(imageReference, selectedFile, 'data_url').then(
      async () => {
        const downloadURL = await getDownloadURL(imageReference)

        await updateDoc(doc(firebaseDb, `posts/${documentReference.id}`), {
          image: downloadURL,
        })
      }
    )

    closeModal()
    setLoading(false)
    setSelectedFile(null)
  }

  const addImageToPost = (e: any) => {
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
      <button
        className="close__btn"
        onClick={closeModal}
        aria-label="close modal"
      >
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
        className="modal__post"
      >
        {selectedFile ? (
          <div className="modal__img" onClick={() => setSelectedFile(null)}>
            <img src={selectedFile} />
          </div>
        ) : (
          <div onClick={() => filePickerRef.current.click()}>
            <label htmlFor="fileInput">
              <IoCameraOutline
                className="modal__svg"
                aria-label="select an image"
              />
            </label>

            <input
              id="fileInput"
              className="modal__file--btn"
              type="file"
              name="file"
              ref={filePickerRef}
              onChange={addImageToPost}
              hidden
            />
          </div>
        )}

        <div className="modal__wrapper">
          <h1>Upload new post</h1>
          <label htmlFor="caption" className=""></label>
          <input
            id="caption"
            type="text"
            name="caption"
            ref={captionRef}
            className="modal__caption"
            placeholder="I love instagram!"
          />
          <button
            onClick={uploadPost}
            className="upload-post__btn"
            disabled={!selectedFile}
          >
            {loading ? 'Uploading...' : 'Upload Post'}
          </button>{' '}
        </div>
      </motion.div>
    </motion.div>
  )
}
