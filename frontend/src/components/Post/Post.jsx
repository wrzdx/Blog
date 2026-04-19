import { useEffect, useRef, useState } from "react"
import styles from "./Post.module.css"
import { deletePost, getPost } from "../../api/post"
import { useNavigate, useParams } from "react-router"
import { Loader } from "../Loader/Loader"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { createComment, deleteComment } from "../../api/comment"
import TrashSVG from "../../assets/trash.svg?react"
import PencilSVG from "../../assets/pencil-line.svg?react"
import { useAuth } from "../../hooks/useAuth"

export function Post() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const commentRef = useRef(null)
  const [post, setPost] = useState(null)
  const navigate = useNavigate()
  const { postId } = useParams()
  useEffect(() => {
    let isMounted = true

    getPost(postId)
      .then((data) => {
        if (isMounted) setPost(data)
      })
      .catch((err) => {
        console.error(err)
        alert(err.messages || "Something went wrong")
        navigate("/")
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [postId, navigate])

  const handleDeletePost = async () => {
    try {
      await deletePost(postId)
      navigate("/")
    } catch (err) {
      console.error(err)
      alert(err.messages || "Something went wrong")
    }
  }

  const handleComment = async () => {
    try {
      const newComment = await createComment(postId, {
        content: commentRef.current.value,
      })
      setPost((prev) => ({
        ...prev,
        comments: [...prev.comments, newComment],
      }))

      commentRef.current.value = ""
    } catch (err) {
      console.error(err)
      alert(err.messages || "Something went wrong")
    }
  }

  const handleDeleteComment = (commentId) => async () => {
    try {
      await deleteComment(postId, commentId)
      setPost((prev) => ({
        ...prev,
        comments: prev.comments.filter((comment) => comment.id !== commentId),
      }))
    } catch (err) {
      console.error(err)
      alert(err.messages || "Something went wrong")
    }
  }

  return (
    <main className={styles.post + " container"}>
      {loading && <Loader />}
      {post && (
        <>
          <h1 className={styles.title}>{post.title}</h1>

          {post.imageUrl && (
            <img
              src={post.imageUrl}
              className={styles.preview}
              alt="preview"
              onError={(e) => {
                e.target.style.display = "none"
              }}
            />
          )}
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>

          <div className={styles.postNav}>
            <p className={styles.meta}>
              <span className={styles.username}>@{post.author.username}</span> ·{" "}
              <span className={styles.date}>{formatDate(post.updatedAt)}</span>
            </p>
            <div
              className={
                styles.editBtn +
                (post.authorId === user?.id ? "" : " " + styles.disabled)
              }
              onClick={() => navigate(`/posts/${postId}/edit`)}
            >
              <PencilSVG />
            </div>
            <div
              className={
                styles.deleteBtn +
                (post.authorId === user?.id ? "" : " " + styles.disabled)
              }
              onClick={handleDeletePost}
            >
              <TrashSVG />
            </div>
          </div>
          <hr />
          <h3>{post.comments.length} Comments</h3>
          <div className={styles.comments}>
            <div className={styles.postComment}>
              <textarea
                name="comment"
                id="comment"
                placeholder="Type here..."
                ref={commentRef}
              ></textarea>
              <button onClick={handleComment}>Comment</button>
            </div>
            {post.comments.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                <p className={styles.meta}>
                  <span className={styles.username}>
                    @{comment.author.username}
                  </span>{" "}
                  <span className={styles.date}>
                    {new Date(comment.createdAt).toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </p>
                <div
                  className={
                    styles.deleteBtn +
                    (comment.authorId === user?.id ? "" : " " + styles.disabled)
                  }
                  onClick={handleDeleteComment(comment.id)}
                >
                  <TrashSVG />
                </div>
                <p className={styles.commentContent}>{comment.content}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  )
}

function formatDate(date) {
  const diff = Date.now() - new Date(date)

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  let timeText = "just now"

  if (minutes >= 1) timeText = `${minutes}m ago`
  if (hours >= 1) timeText = `${hours}h ago`
  if (days >= 1) timeText = `${days}d ago`

  return timeText
}
