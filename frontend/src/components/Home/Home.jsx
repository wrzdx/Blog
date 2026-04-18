import { useEffect, useState } from "react"
import styles from "./Home.module.css"
import { getPosts } from "../../api/post"
import { PostCard } from "../PostCard/PostCard"
import { Loader } from "../Loader/Loader"

export function Home() {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  let content = <Loader />

  if (!loading) {
    content =
      posts.length === 0 ? (
        <h1 className={styles.empty}>No posts yet</h1>
      ) : (
        <div className={styles.posts}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )
  }
  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((err) => {
        console.error(err)
        alert(err.messages || "Something went wrong")
      })
      .finally(() => setLoading(false))
  }, [])

  return <main className={styles.home + " container"}>{content}</main>
}
