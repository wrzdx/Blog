import { useState } from "react"
import { createPost } from "../../api/post"
import { Editor } from "../Editor/Editor"
import { useNavigate } from "react-router"

export function NewPost() {
  const navigate = useNavigate()
  const [content, setContent] = useState("Type here...")
  const [title, setTitle] = useState("New Post")
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePublish = async () => {
    if (isSubmitting) return
    try {
      setIsSubmitting(true)
      const post = await createPost({
        content,
        title,
        file: image,
        published: true,
      })
      navigate("/posts/" + post.id)
    } catch (err) {
      console.error(err)
      alert(err.messages || "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Editor
      {...{
        navigate,
        content,
        setContent,
        title,
        setTitle,
        setImage,
        preview,
        setPreview,
        handlePublish,
        buttonContent: "Create Post",
        isSubmitting
      }}
    />
  )
}
