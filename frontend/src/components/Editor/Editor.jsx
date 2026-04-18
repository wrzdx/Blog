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
import { useEffect, useRef } from "react"
import styles from "./Editor.module.css"
import PencilSVG from "../../assets/pencil-line.svg?react"

export function Editor({
  content,
  setContent,
  title,
  setTitle,
  setImage,
  handlePublish,
  preview,
  setPreview,
  buttonContent,
}) {
  const titleRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setImage(file)

    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  const handleRemoveImage = () => {
    setImage(null)
    setPreview(null)
    fileInputRef.current.value = ""
  }

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
        {buttonContent}
      </button>
    </main>
  )
}
