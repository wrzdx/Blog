import { Link } from "react-router"
import { error } from "./Error.module.css"
import { Header } from "../Header/Header"
import { Footer } from "../Footer/Footer"

const ErrorPage = () => {
  return (
    <>
      <Header />
      <main className={error + " container"}>
        <h1>Oh no, this route doesn't exist!</h1>
        <Link to="/">Go back to Home</Link>
      </main>
      <Footer />
    </>
  )
}

export default ErrorPage
