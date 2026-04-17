import fs from "fs"
import path from "path"

export function extractImages(html) {
  const regex = /<img[^>]+src="([^">]+)"/g
  const urls = []
  let match

  while ((match = regex.exec(html))) {
    urls.push(match[1])
  }

  return urls
}



export function deleteImages(urls) {
  urls.forEach((url) => {
    const filePath = path.join("uploads", path.basename(url))

    fs.unlink(filePath, (err) => {
      if (err) console.error(err)
    })
  })
}