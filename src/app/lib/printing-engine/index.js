import { getUploadStatus } from './rest-api'
export * from './rest-api'

export function pollUploadStatus ({modelId}) {
  let retries = 100
  const interval = 1000

  return new Promise((resolve, reject) => {
    const pollStatus = async () => {
      const isFinished = await getUploadStatus({modelId})
      if (isFinished) resolve()
      else if (retries-- > 0) setTimeout(pollStatus, interval)
      else reject()
    }
    pollStatus()
  })
}
