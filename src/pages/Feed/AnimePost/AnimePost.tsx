import { VscSmiley as Smiley } from 'react-icons/vsc'
import { firebaseDb, firebaseAuth } from '../../../library/firebase'
import {
  doc,
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import {
  HiOutlinePaperAirplane as Plane,
  HiOutlineHeart as OutlinedHeart,
  HiHeart as FilledHeart,
  HiOutlineChat as Comment,
  HiOutlineBookmark as SavePost,
} from 'react-icons/hi'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { AnimeComments } from './AnimeComments'

type AnimePost = {
  picture: string
  caption: string
  username: string
  post: string
  animeId: string
}

type AnimeComments = {
  animeCommentUserId: string
  animeCommentId: string
  animeComment: string
  animeProfile: string
  animeProfileImage: string
  timestamp: {
    nanoseconds: number
    seconds: number
  }
}

export function AnimePost({
  username,
  picture,
  caption,
  post,
  animeId,
}: AnimePost) {
  const [likesAnimePost, setLikesAnimePost] = useState([])
  const [hasLikedAnimePost, setHasLikedAnimePost] = useState(false)
  const [animeComment, setAnimeComment] = useState('')
  const [animeComments, setAnimeComments] = useState<AnimeComments[]>([])

  const animeCommentsCollectionReference = collection(
    firebaseDb,
    'profiles',
    animeId,
    'comments'
  ) as CollectionReference<AnimeComments>

  const sendAnimeComment = async () => {
    const commentToSend = animeComment
    setAnimeComment('')

    await addDoc(animeCommentsCollectionReference, {
      animeComment: commentToSend,
      animeProfile: firebaseAuth.currentUser?.displayName,
      animeProfileImage: firebaseAuth.currentUser?.photoURL,
      animeCommentUserId: firebaseAuth.currentUser?.uid,
      timestamp: serverTimestamp(),
    })
  }

  useEffect(() => {
    const getComments = async () =>
      onSnapshot(
        query(animeCommentsCollectionReference, orderBy('timestamp', 'desc')),
        (snapshot) => {
          return setAnimeComments(
            snapshot.docs.map((doc) => ({ ...doc.data(), commentId: doc.id }))
          )
        }
      )
    getComments()
  }, [firebaseDb, animeId])

  // Likes

  useEffect(
    () =>
      onSnapshot(
        collection(firebaseDb, 'profiles', animeId, 'likes'),
        (snapshot) => setLikesAnimePost(snapshot.docs)
      ),
    [firebaseDb, animeId]
  )

  useEffect(
    () =>
      setHasLikedAnimePost(
        likesAnimePost.findIndex(
          (like) => like.id === firebaseAuth.currentUser?.uid
        ) !== -1
      ),
    [likesAnimePost]
  )

  const likePost = async () => {
    if (hasLikedAnimePost) {
      await deleteDoc(
        doc(
          firebaseDb,
          'profiles',
          animeId,
          'likes',
          firebaseAuth.currentUser?.uid
        )
      )
    } else {
      await setDoc(
        doc(
          firebaseDb,
          'profiles',
          animeId,
          'likes',
          firebaseAuth.currentUser?.uid
        ),
        {
          username: firebaseAuth.currentUser?.displayName,
        }
      )
    }
  }

  return (
    <article className="post">
      <div className="post__header">
        <div className="post__header--wrapper">
          <img src={picture} alt={username} />
          <span className="post__post--info">
            <p className="username">{username}</p>
          </span>
        </div>
      </div>

      <img src={post} alt="Instagram post" className="post__image" />

      <div className="post__description">
        <div className="post__actions">
          <div className="post__actions--wrapper">
            {hasLikedAnimePost ? (
              <motion.button
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {
                    scale: 1.2,
                  },
                  visible: {
                    scale: 1,
                    transition: {
                      delay: 0.1,
                    },
                  },
                }}
              >
                <FilledHeart
                  className="post__actions--icon heart"
                  onClick={likePost}
                />
              </motion.button>
            ) : (
              <button>
                <OutlinedHeart
                  className="post__actions--icon heart-outline"
                  onClick={likePost}
                />
              </button>
            )}

            <Comment className="post__actions--icon" />
            <Plane className="post__actions--icon" />
          </div>
          <SavePost className="post__actions--icon" />
        </div>

        <div className="post__likes">
          {likesAnimePost.length > 0 && <p>{likesAnimePost.length} likes</p>}
        </div>
        <div className="post__caption">
          <p>
            <span className="thick">{username}</span> {caption}
          </p>
        </div>
        <div className="comments">
          {animeComments.map(
            ({
              animeProfile,
              animeProfileImage,
              animeComment,
              animeCommentUserId,
              animeCommentId,
              animeId,
            }) => {
              return (
                <AnimeComments
                  key={animeCommentId}
                  animeProfile={animeProfile}
                  animeProfileImage={animeProfileImage}
                  animeComment={animeComment}
                  animeCommentId={animeCommentId}
                  animeId={animeId}
                  animeCommentUserId={animeCommentUserId}
                />
              )
            }
          )}
        </div>
        <div className="post__commenting">
          <Smiley className="post__commenting--icon" />

          <input
            value={animeComment}
            onChange={(e) => setAnimeComment(e.target.value)}
            type="text"
            name="comment"
            placeholder="Add a comment..."
          />
          <button onClick={sendAnimeComment} disabled={!animeComment.trim()}>
            Post
          </button>
        </div>
      </div>
    </article>
  )
}
