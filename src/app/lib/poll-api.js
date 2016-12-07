export default api => {
  let retries = 100
  const interval = 1000

  return new Promise((resolve, reject) => {
    const poll = async () => {
      const isFinished = await api.catch(reject)
      if (isFinished) resolve()
      else if (retries-- > 0) setTimeout(poll, interval)
      else reject()
    }
    poll()
  })
}
