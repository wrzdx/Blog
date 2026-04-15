import * as postService from "../services/post.service.js"

export async function getPosts(req, res) {
  res.json(await postService.getPosts())
}
