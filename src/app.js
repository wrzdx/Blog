import "dotenv/config"
import express from "express"
import router from "./routes/router.js"

const PORT = process.env.PORT || 8000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", router)
app.use((err, req, res, next) => {
  console.error(err)

  const status = err.status || 500

  res.status(status).json({
    message: err.message || "Something went wrong",
  })
})

app.listen(PORT, (error) => {
  if (error) {
    throw error
  }
  console.log(`You can access site on http://localhost:${PORT}`)
})
