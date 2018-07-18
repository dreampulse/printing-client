const BackendModel = ({modelId = 'some-model-id'}) => ({
  modelId,
  fileName: 'some-filename',
  fileUnit: 'mm',
  area: 42,
  volume: 42,
  dimensions: {
    x: 42,
    y: 42,
    z: 42
  },
  thumbnailUrl: 'some-thumbnail-url'
})

export default BackendModel
