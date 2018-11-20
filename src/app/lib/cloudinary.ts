import config from '../../../config'

export default function getCloudinaryUrl(imageId: string, cloudinaryParams: string[]) {
  const params = [...cloudinaryParams, ...config.cloudinaryDefaultParams]

  return `${config.cloudinaryUrl}/${params.join(',')}/${imageId}`
}
