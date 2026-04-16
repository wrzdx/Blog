import { Link, useNavigate } from "react-router"
import styles from "./Header.module.css"
import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { logout } from "../../api/auth"
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
const authLinks = [
  {
    path: "/profile",
    content: "Profile",
  },
  {
    path: "/newpost",
    content: "New Post",
  },
]

export default function Header() {
  const { user, setUser } = useAuth()
  const [avatarOpen, setAvatarOpen] = useState(false)
  const navigate = useNavigate()
  const links = user ? authLinks : unauthLinks
  const username = user?.username || "Guest"

  const handleSignOut = async () => {
    try {
      await logout()
      setUser(null)
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
        <span className={styles.username}>{username}</span>
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
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
