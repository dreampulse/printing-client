import config from '../../../config'

export default function getCloudinaryUrl(imageId, cloudinaryParams) {
  const params = [...cloudinaryParams, ...config.cloudinaryDefaultParams]

  return `${config.cloudinaryUrl}/${params.join(',')}/${imageId}`
}
