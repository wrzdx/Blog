function stripMarkdown(md) {
  return md
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[.*?\]\(.*?\)/g, "")
    .replace(/[*_#>`~\-]/g, "")
}

export function getPreview(md, maxLength = 180) {
  const text = stripMarkdown(md)

  if (text.length <= maxLength) return text
  return text.slice(0, maxLength)
}
