import { useState } from "react"
import LoginSVG from "../../assets/log-in.svg?react"
import UserPlusSVG from "../../assets/user-plus.svg?react"
import EyeSVG from "../../assets/eye.svg?react"
import EyeClosedSVG from "../../assets/eye-closed.svg?react"
import { register } from "../../api/auth"
import { Link, useNavigate } from "react-router"
import styles from "./SignUp.module.css"
import { useAuth } from "../../hooks/useAuth"

export function SignUp() {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()
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
      fullName: form.fullName.value,
    }

    try {
      const resData = await register(data)
      setUser(resData.user)
      navigate("/")
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }
  if (user) {
    navigate("/")
  }
  return (
    <main className={styles.signup + " container"}>
      <h1>Create Account</h1>
      <form action="post" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Enter"
            minLength={3}
            maxLength={50}
            required
          />
        </p>
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
        <button type="submit">{<UserPlusSVG />} Sign Up</button>
      </form>
      <div className={styles.delimiter}>
        <hr />
        or
        <hr />
      </div>
      <Link to="/login">
        <LoginSVG /> Sign In
      </Link>
    </main>
  )
}
