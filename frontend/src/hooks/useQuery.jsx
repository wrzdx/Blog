import { useState } from "react"

export const useQuery = () => {
  const [loading, setLoading] = useState(false)

  const run = async (fn) => {
    if (loading) return
    setLoading(true)
    try {
      return await fn()
    } finally {
      setLoading(false)
    }
  }

  return { loading, run }
}