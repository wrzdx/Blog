import "dotenv/config"
import express from "express"
import router from "./routes/index.js"
import cookieParser from "cookie-parser"

const PORT = process.env.PORT || 8000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

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
