import { api, API_URL } from "./client.js"

export const getPosts = () => api("/posts")

export const getPost = (id) => api(`/posts/${id}`)

export const getMyPosts = () => api("/posts/my")
export const createPost = async ({ title, content, published, file }) => {
  const formData = new FormData()

  if (file) {
    formData.append("file", file)
  }

  formData.append("title", title)
  formData.append("content", content)
  formData.append("published", published)

  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    body: formData,
    credentials: "include",
  })

  const data = await res.json()

  if (!res.ok) {
    throw {
      status: res.status,
      messages: data.messages || ["API error"],
      data,
    }
  }

  return data
}

export const updatePost = (id, data) =>
  api(`/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })

export const deletePost = (id) =>
  api(`/posts/${id}`, {
    method: "DELETE",
  })
