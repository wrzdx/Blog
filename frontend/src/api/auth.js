import { api } from "./client.js"

export const login = (data) =>
  api("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  })

export const me = () => api("/auth/me")

export const register = (data) =>
  api("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  })

export const logout = () =>
  api("/auth/logout", {
    method: "POST",
  })
