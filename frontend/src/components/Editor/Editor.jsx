import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ListsToggle,
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor"
import "@mdxeditor/editor/style.css"
import { useEffect, useRef, useState } from "react"
import styles from "./Editor.module.css"
import PencilSVG from "../../assets/pencil-line.svg?react"
import { createPost } from "../../api/post"
import { useNavigate } from "react-router"

export function Editor({edit=false}) {
  const navigate = useNavigate()
  const [content, setContent] = useState("Type here...")
  const [title, setTitle] = useState("New Post")
  const titleRef = useRef(null)
  const fileInputRef = useRef(null)
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setImage(file)

    const url = URL.createObjectURL(file)
    setPreview(url)
  }
  const handlePublish = async () => {
    try {
      await createPost({
        content,
        title,
        file: image,
        published: true,
      })
      navigate("/profile")
    } catch (err) {
      console.error(err)
      alert(err.messages || "Something went wrong")
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setPreview(null)
    fileInputRef.current.value = ""
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  return (
    <main className={styles.newpost + " container"}>
      <input
        ref={titleRef}
        className={styles.title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Post"
      />

      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
        ref={fileInputRef}
        minLength={3}
        maxLength={255}
        hidden
      />

      {preview ? (
        <div className={styles.previewWrapper}>
          <img src={preview} className={styles.preview} alt="preview" />
          <button
            type="button"
            className={styles.removeBtn}
            onClick={handleRemoveImage}
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          className={styles.uploadBtn}
          onClick={() => fileInputRef.current.click()}
        >
          Upload cover
        </button>
      )}

      <MDXEditor
        contentEditableClassName={styles.editor + " .dark-editor"}
        markdown={content}
        onChange={setContent}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <ListsToggle />
              </>
            ),
          }),
        ]}
      />
      <button className={styles.publish} onClick={handlePublish}>
        <PencilSVG />
        Create Post
      </button>
    </main>
  )
}
