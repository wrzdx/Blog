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

  const data = res.status !== 204 ? await res.json() : {}

  if (!res.ok) {
    throw {
      status: res.status,
      messages: data.messages || ["API error"],
      data,
    }
  }

  return data
}
