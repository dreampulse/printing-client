import reducer from '../../../../src/app/reducer/model'
import TYPE from '../../../../src/app/type'

describe('app reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {}), 'to equal', {
      isUploadFinished: false,
      modelId: null
    })
  })

  it('handles MODEL.UPLOAD_FINISHED action', () => {
    const stateBefore = {
      some: 'state'
    }

    const action = {
      type: TYPE.MODEL.UPLOAD_FINISHED,
      payload: undefined
    }

    expect(reducer(stateBefore, action), 'to equal', {
      isUploadFinished: true,
      some: 'state'
    })
  })

  it('handles MODEL.UPLOAD_STARTED action', () => {
    const stateBefore = {
      some: 'state'
    }

    const action = {
      type: TYPE.MODEL.UPLOAD_STARTED,
      payload: 'some-model-id'
    }

    expect(reducer(stateBefore, action), 'to equal', {
      modelId: 'some-model-id',
      some: 'state'
    })
  })
})
