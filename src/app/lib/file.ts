export const parseFileName = (filename: string) => {
  const parts = filename.split('.')
  const extension = parts.pop()
  return {
    name: parts.join('.'),
    extension
  }
}
