import { api } from "./client"

export const getPostComment = (id) => api(`/posts/${id}/comments`)
export const createComment = (id, data) =>
  api(`/posts/${id}/comments`, {
    method: "POST",
    body: JSON.stringify(data),
  })

  export const deleteComment = (postId, commentId) =>
  api(`/posts/${postId}/comments/${commentId}`, {
    method: "DELETE",
  })
