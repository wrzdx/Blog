// src/middleware/upload.js
import multer from "multer"

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname
    cb(null, unique)
  },
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"]

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("Only JPG and PNG allowed"), false)
  }
}

export const upload = multer({ storage, fileFilter })