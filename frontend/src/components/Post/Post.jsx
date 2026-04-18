import { useEffect, useState } from "react"
import styles from "./Post.module.css"
import { getPosts } from "../../api/post"
import {PostCard} from "../PostCard/PostCard"

export function Post() {
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(null)
  let content = <span className={styles.spin}></span>
  useEffect(() => {
    getPosts()
      .then(setPost)
      .catch((err) => {
        console.error(err)
        alert(err.messages || "Something went wrong")
        navigate("/")
      })
      .finally(() => setLoading(false))
  }, [])

  return <main className="container">{content}</main>
}
