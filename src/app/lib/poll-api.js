import config from '../../../config'

export default api => {
  let retries = config.pollingRetries
  const interval = config.pollingInvervall

  return new Promise((resolve, reject) => {
    const poll = async () => {
      const isFinished = await api().catch(reject)
      if (isFinished) resolve()
      else if (retries-- > 1) setTimeout(poll, interval)
      else reject()
    }
    poll()
  })
}
