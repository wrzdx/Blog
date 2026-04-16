import { api } from "./client.js"

export const getPosts = () => api("/posts")

export const getPost = (id) => api(`/posts/${id}`)

export const getMyPosts = () => api("/posts/my")

export const createPost = (data) =>
  api("/posts", {
    method: "POST",
    body: JSON.stringify(data),
  })

export const updatePost = (id, data) =>
  api(`/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })

export const deletePost = (id) =>
  api(`/posts/${id}`, {
    method: "DELETE",
  })
