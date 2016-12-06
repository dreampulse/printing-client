export default ({restApi}) => {

  const pollUploadStatus = ({modelId}) => {
    let retries = 100
    const interval = 1000

    return new Promise((resolve, reject) => {
      const pollStatus = async () => {
        const isFinished = await restApi.getUploadStatus({modelId})
        if (isFinished) resolve()
        else if (retries-- > 0) setTimeout(pollStatus, interval)
        else reject()
      }
      pollStatus()
    })
  }

  return {
    ...restApi,
    pollUploadStatus
  }
}
