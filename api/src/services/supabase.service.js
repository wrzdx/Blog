import { createClient } from "@supabase/supabase-js"
import { randomUUID } from "crypto"

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
)

export async function uploadFile(file) {
  const safeName = file.originalname.normalize("NFKD").replace(/[^\w.\-]/g, "_")
  const key = randomUUID() + safeName

  const { data, error } = await supabaseAdmin.storage
    .from("files")
    .upload(key, file.buffer, {
      contentType: file.mimetype,
    })

  if (error) {
    throw new Error(`Upload failed: ${error.message}`)
  }

  return data.path
}

export async function getFileUrl(path) {
  const { data, error } = await supabaseAdmin.storage
    .from("files")
    .createSignedUrl(path, 60 * 5)

  if (error) throw error

  return data.signedUrl
}

export async function deleteFile(path) {
  const { error } = await supabaseAdmin.storage.from("files").remove([path])

  if (error) {
    throw new Error(`Delete failed: ${error.message}`)
  }
}
