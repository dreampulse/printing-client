import getCloudinaryUrl from 'Lib/cloudinary'
import config from '../../../../config'

describe('getCloudinaryUrl()', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(config, 'cloudinaryUrl').value('//cloudinary.invalid')
    sandbox.stub(config, 'cloudinaryDefaultParams').value([])
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('returns cloudinary url with given parameters', () => {
    const url = getCloudinaryUrl('some-image', ['param1', 'param2'])
    expect(url, 'to equal', '//cloudinary.invalid/param1,param2/some-image')
  })

  it('returns cloudinary url with default parameters', () => {
    config.cloudinaryDefaultParams = ['default-param']
    const url = getCloudinaryUrl('some-image', ['param1', 'param2'])
    expect(url, 'to equal', '//cloudinary.invalid/param1,param2,default-param/some-image')
  })
})
