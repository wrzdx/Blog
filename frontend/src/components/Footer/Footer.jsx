import { footer } from "./Footer.module.css"
import GithubSVG from "../../assets/github.svg?react"

export function Footer() {
  return (
    <footer className={footer}>
      <div className="container">
        <a href="https://github.com/wrzdx" target="_blank">
          wrzdx
          {<GithubSVG />}
        </a>
      </div>
    </footer>
  )
}
