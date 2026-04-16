import { Link, useNavigate } from "react-router"
import { header } from "./Header.module.css"
import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { logout } from "../../api/auth"
const unauthLinks = [
  {
    path: "/login",
    content: "Login",
  },
  {
    path: "/register",
    content: "Register",
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
    <header className={header}>
      <Link to="/" className="logo">
        Blog
      </Link>
      <div className="avatar">
        <button onClick={() => setAvatarOpen((prev) => !prev)}>👤</button>

        {avatarOpen && (
          <div className="dropdown">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="link"
                onClick={() => setAvatarOpen(false)}
              >
                {link.content}
              </Link>
            ))}
            {user && (
              <button className="link logout" onClick={handleSignOut}>
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
