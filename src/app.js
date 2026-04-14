import "dotenv/config"
import express from "express"
import router from "./routes/router.js"


const PORT = process.env.PORT || 8000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

passport.deserializeUser(deserializer)

app.use("/", router)
app.use((err, req, res, next) => {
  console.error(err)
  const message = err.message || ["Something went wrong"]
  res.send(message)
})

app.listen(PORT, (error) => {
  if (error) {
    throw error
  }
  console.log(`You can access site on http://localhost:${PORT}`)
})