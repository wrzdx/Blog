import { useEffect, useState } from "react"
import { getPost, updatePost } from "../../api/post"
import { Editor } from "../Editor/Editor"
import { useNavigate, useParams } from "react-router"
import { Loader } from "../Loader/Loader"

export function EditPost() {
  const { postId } = useParams()
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
      await updatePost(postId, {
        content,
        title,
        file: image,
        published: true,
      })
      navigate("/posts/" + postId)
    } catch (err) {
      console.error(err)
      alert(err.messages || "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let isMounted = true

    getPost(postId)
      .then(async (data) => {
        if (isMounted) {
          setContent(data.content)
          setTitle(data.title)
          const res = await fetch(data.imageUrl)
          const blob = await res.blob()
          const file = new File([blob], "image.jpeg", { type: blob.type })
          console.log(blob.type)
          setImage(file)
          setPreview(data.imageUrl)
        }
      })
      .catch((err) => {
        console.error(err)
        alert(err.messages || "Something went wrong")
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [postId, navigate])
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  if (loading) {
    return (
      <div className="container">
        <Loader />
      </div>
    )
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
        buttonContent: "Update Post",
        isSubmitting,
      }}
    />
  )
}
