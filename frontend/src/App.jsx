import "./css/App.css"
import { Outlet } from "react-router"
import { Header } from "./components/Header/Header"
import { Footer } from "./components/Footer/Footer"
import { useEffect } from "react"
import { me } from "./api/auth"
import { useAuth } from "./hooks/useAuth"

export function App() {
  const { setUser } = useAuth()
  useEffect(() => {
    me()
      .then((data) => {
        setUser(data.user)
      })
      .catch(() => {
        setUser(null)
      })
  })
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
