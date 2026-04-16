export const API_URL = import.meta.env.VITE_API_URL

export async function api(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  })

  const data = await res.json()

  if (!res.ok) {
    throw {
      status: res.status,
      message: data.message || "API error",
      data,
    }
  }

  return data
}
