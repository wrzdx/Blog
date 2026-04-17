import { Link, useNavigate } from "react-router"
import styles from "./Header.module.css"
import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { logout } from "../../api/auth"
import UserSVG from "../../assets/user.svg?react"
import PencilSVG from "../../assets/pencil-line.svg?react"
import AvatarSVG from "../../assets/avatar.svg?react"
import LoginSVG from "../../assets/log-in.svg?react"
import UserPlusSVG from "../../assets/user-plus.svg?react"
import LogoutSVG from "../../assets/log-out.svg?react"

const unauthLinks = [
  {
    icon: <LoginSVG />,
    path: "/login",
    content: "Sign In",
  },
  {
    icon: <UserPlusSVG />,
    path: "/register",
    content: "Sign Up",
  },
]
const authorLinks = [
  {
    icon: <UserSVG />,
    path: "/profile",
    content: "Profile",
  },
  {
    icon: <PencilSVG />,
    path: "/newpost",
    content: "New Post",
  },
]

export function Header() {
  const { user, setUser } = useAuth()
  const [avatarOpen, setAvatarOpen] = useState(false)
  const navigate = useNavigate()
  const authLinks = user?.isAuthor ? authorLinks : []
  const links = user ? authLinks : unauthLinks
  const username = user?.username || "Guest"

  const handleSignOut = async () => {
    try {
      await logout()
      setUser(null)
      setAvatarOpen(false)
      navigate("/", { replace: true })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <Link to="/" className={styles.logo}>
          <span className="red">&lt;</span>wrzdx<span className="red">.</span>
          blog<span className="red">&gt;</span>
        </Link>
        <span className={styles.username + " red"}>{username}</span>
        <div className={styles.avatar}>
          <button onClick={() => setAvatarOpen((prev) => !prev)}>
            {<AvatarSVG />}
          </button>
          {avatarOpen && (
            <div
              className={styles.backdrop}
              onClick={() => setAvatarOpen(false)}
            ></div>
          )}
          <div
            className={`${styles.dropdown} ${avatarOpen ? styles.open : ""}`}
          >
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setAvatarOpen(false)}
              >
                {link.icon}
                {link.content}
              </Link>
            ))}
            {user && (
              <button className="red" onClick={handleSignOut}>
                <LogoutSVG />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
