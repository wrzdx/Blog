// src/middleware/upload.js
import multer from "multer"

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"]

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("Only JPG and PNG allowed"), false)
  }
}

export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
})
