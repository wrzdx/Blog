import "./css/App.css"
import { Outlet } from "react-router"
import { Header } from "./components/Header/Header"
import { Footer } from "./components/Footer/Footer"

export function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
