import "dotenv/config"
import cors from "cors"
import express from "express"
import router from "./routes/index.js"
import cookieParser from "cookie-parser"

const PORT = process.env.PORT || 8000
const allowedOrigins = new Set(
  process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim()),
)
const app = express()

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true)

      if (allowedOrigins.has(origin)) {
        return callback(null, origin)
      }

      return callback(new Error("Not allowed by CORS"))
    },
    credentials: true,
  }),
)
const allowedOriginsArray = [...allowedOrigins]

app.use((req, res, next) => {
  const origin = req.headers.origin

  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    return next()
  }

  if (!origin || !allowedOriginsArray.includes(origin)) {
    return res.status(403).json({ message: "CSRF blocked" })
  }

  next()
})
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "10mb", extended: true }))
app.use(cookieParser())
app.use("/uploads", express.static("uploads"))
app.use("/", router)
app.use((err, req, res, next) => {
  console.error(
    `[${new Date().toISOString()}]`,
    err.message,
    req.method,
    req.url,
  )

  res.status(err.status || 500).json({
    messages: [err.message || "Internal Server Error"],
  })
})

app.listen(PORT, (error) => {
  if (error) {
    throw error
  }
  console.log(`You can access site on http://localhost:${PORT}`)
})
