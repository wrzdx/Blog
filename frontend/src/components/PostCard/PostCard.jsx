import { Link } from "react-router"
import styles from "./PostCard.module.css"
import BookSVG from "../../assets/book-open.svg?react"
import ImageSVG from "../../assets/image.svg?react"

export function PostCard({ post }) {
  return (
    <div key={post.id} className={styles.post}>
      <div>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.meta}>
          <span className={styles.username}>@{post.author.username}</span> ·{" "}
          <span className={styles.date}>{formatDate(post.updatedAt)}</span>
        </p>
      </div>

      {post.imageUrl ? (
        <img
          src={post.imageUrl}
          alt="preview"
          onError={(e) => {
            e.target.style.display = "none"
          }}
          className={styles.preview}
        />
      ) : (
        <div className={styles.placeholder}>
          <ImageSVG />
          No Preview
        </div>
      )}
      <div>
        <p className={styles.content}>{post.content}</p>
        <Link to={"/" + post.id} className={styles.readmore}>
          <BookSVG />
          Read More
        </Link>
      </div>
    </div>
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
