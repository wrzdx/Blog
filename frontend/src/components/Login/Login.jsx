import { useState } from "react"
import LoginSVG from "../../assets/log-in.svg?react"
import UserPlusSVG from "../../assets/user-plus.svg?react"
import EyeSVG from "../../assets/eye.svg?react"
import EyeClosedSVG from "../../assets/eye-closed.svg?react"
import { login } from "../../api/auth"
import { Link, useNavigate } from "react-router"
import styles from "./Login.module.css"
import { useAuth } from "../../hooks/useAuth"

export function Login() {
  const navigate = useNavigate()
  const {user, setUser} = useAuth()
  const [showPsw, setShowPsw] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = e.target

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const data = {
      username: form.username.value,
      password: form.password.value,
    }

    try {
      const resData = await login(data)
      setUser(resData.user)
      navigate("/")
    } catch (err) {
      console.error(err)
      alert(err.messages || "Something went wrong")
    }
  }
  if (user) {
    navigate("/")
  }
  return (
    <main className={styles.login + " container"}>
      <h1>Sign In</h1>
      <form action="post" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter"
            minLength={3}
            maxLength={50}
            required
          />
        </p>
        <div>
          <label htmlFor="password">Password</label>
          <div>
            <input
              type={showPsw ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter"
              minLength={8}
              maxLength={50}
              required
            />
            <button type="button" onClick={() => setShowPsw(!showPsw)}>
              {showPsw ? <EyeSVG /> : <EyeClosedSVG />}
            </button>
          </div>
        </div>
        <button type="submit">{<LoginSVG />} Sign In</button>
      </form>
      <div className={styles.delimiter}>
        <hr />
        or
        <hr />
      </div>
      <Link to="/register">
        <UserPlusSVG /> Sign Up
      </Link>
    </main>
  )
}
