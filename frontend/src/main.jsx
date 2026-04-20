import "./prism-setup.js" 
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./css/reset.css"
import Router from "./router"
import { AuthProvider } from "./contexts/AuthContext"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </StrictMode>,
)
