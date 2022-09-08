import {
  doc,
  collection,
  deleteDoc,
  onSnapshot,
  setDoc,
  CollectionReference,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firebaseAuth, firebaseDb } from '../../../library/firebase'
import { motion } from 'framer-motion'

type follows = {
  followId: string
  username: string
}

type SideProfileProps = {
  username: string
  picture: string
  info: string
  profileId: string
}

export function SideProfile({
  username,
  picture,
  info,
  profileId,
}: SideProfileProps) {
  const [follows, setFollows] = useState<follows[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hasFollowed, setHasFollowed] = useState(false)
  const followsCollectionReference = collection(
    firebaseDb,
    'sideProfiles',
    profileId,
    'follows'
  ) as CollectionReference<follows>

  useEffect(
    () =>
      onSnapshot(followsCollectionReference, (snapshot) =>
        setFollows(
          snapshot.docs.map((doc) => ({ ...doc.data(), followId: doc.id }))
        )
      ),
    [firebaseDb, profileId]
  )

  useEffect(
    () =>
      setHasFollowed(
        follows.findIndex(
          (like) => like.followId === firebaseAuth.currentUser?.uid
        ) !== -1
      ),
    [follows]
  )

  const followUser = async () => {
    if (hasFollowed) {
      await deleteDoc(
        doc(
          firebaseDb,
          'sideProfiles',
          profileId,
          'follows',
          firebaseAuth.currentUser?.uid
        )
      )
    } else {
      await setDoc(
        doc(
          firebaseDb,
          'sideProfiles',
          profileId,
          'follows',
          firebaseAuth.currentUser?.uid
        ),
        {
          username: firebaseAuth.currentUser?.displayName,
        }
      )
    }
  }

  return (
    <>
      <div className="profile">
        <img src={picture} alt="profile picture" />
        <div className="profile--info">
          <p className="username">{username}</p>
          <p>{info}</p>
        </div>
        {hasFollowed ? (
          <button onClick={() => setIsOpen(true)}>Unfollow</button>
        ) : (
          <button onClick={followUser}>Follow</button>
        )}
      </div>

      {isOpen ? (
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
          onClick={() => setIsOpen(false)}
        >
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
            className="post__modal"
          >
            <p>Are you sure you want to unfollow this user?</p>

            <button onClick={followUser}>Unfollow</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </motion.div>
        </motion.div>
      ) : (
        ''
      )}
    </>
  )
}