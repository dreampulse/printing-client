import reducer from 'Reducer/model'
import {FileUploadError} from 'Lib/error'
import TYPE from '../../../../src/app/type'

describe('Model reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {}), 'to equal', {
      numberOfUploads: 0,
      selectedUnit: 'mm',
      models: []
    })
  })

  describe('handles TYPE.MODEL.UNIT_CHANGED:', () => {
    let stateBefore
    let action

    beforeEach(() => {
      stateBefore = {
        some: 'thing'
      }

      action = {
        type: TYPE.MODEL.UNIT_CHANGED,
        payload: {unit: 'cm'}
      }
    })

    it('sets selectedUnit', () => {
      expect(reducer(stateBefore, action), 'to equal', {
        some: 'thing',
        selectedUnit: 'cm'
      })
    })
  })

  describe('handles TYPE.MODEL.QUANTITIY_CHANGED:', () => {
    let stateBefore
    let action

    beforeEach(() => {
      stateBefore = {
        some: 'thing',
        models: [
          {fileId: 1, quantity: 1},
          {fileId: 2, quantity: 2}
        ]
      }

      action = {
        type: TYPE.MODEL.QUANTITIY_CHANGED,
        payload: {quantity: 3}
      }
    })

    it('updates quantity in all models', () => {
      expect(reducer(stateBefore, action), 'to equal', {
        some: 'thing',
        models: [
          {fileId: 1, quantity: 3},
          {fileId: 2, quantity: 3}
        ]
      })
    })
  })

  describe('handles TYPE.MODEL.INDIVIDUAL_QUANTITIY_CHANGED:', () => {
    let stateBefore
    let action

    beforeEach(() => {
      stateBefore = {
        some: 'thing',
        models: [
          {modelId: 1, quantity: 1},
          {modelId: 2, quantity: 2}
        ]
      }

      action = {
        type: TYPE.MODEL.INDIVIDUAL_QUANTITIY_CHANGED,
        payload: {modelId: 2, quantity: 3}
      }
    })

    it('updates quantity in model with given modelId', () => {
      expect(reducer(stateBefore, action), 'to equal', {
        some: 'thing',
        models: [
          {modelId: 1, quantity: 1},
          {modelId: 2, quantity: 3}
        ]
      })
    })
  })

  describe('handles TYPE.MODEL.FILE_UPLOAD_STARTED:', () => {
    let stateBefore
    let action

    beforeEach(() => {
      stateBefore = {
        numberOfUploads: 0,
        models: [
          {some: 'old-model'}
        ]
      }

      action = {
        type: TYPE.MODEL.FILE_UPLOAD_STARTED,
        payload: {fileId: 1, name: 'some-name', size: 123}
      }
    })

    it('adds new model', () => {
      expect(reducer(stateBefore, action).models, 'to equal', [
        {some: 'old-model'},
        {
          fileId: 1,
          name: 'some-name',
          size: 123,
          progress: 0,
          uploadFinished: false
        }
      ])
    })

    it('increments numberOfUploads', () => {
      expect(reducer(stateBefore, action).numberOfUploads, 'to equal', 1)
    })
  })

  describe('handles TYPE.MODEL.FILE_UPLOAD_PROGRESSED:', () => {
    let stateBefore
    let action

    beforeEach(() => {
      stateBefore = {
        some: 'thing',
        models: [
          {fileId: 1, progress: 0},
          {fileId: 2, progress: 0}
        ]
      }

      action = {
        type: TYPE.MODEL.FILE_UPLOAD_PROGRESSED,
        payload: {fileId: 1, progress: 0.5}
      }
    })

    it('updates progress in model with given fileId', () => {
      expect(reducer(stateBefore, action), 'to equal', {
        some: 'thing',
        models: [
          {fileId: 1, progress: 0.5},
          {fileId: 2, progress: 0}
        ]
      })
    })
  })

  describe('handles TYPE.MODEL.FILE_UPLOADED:', () => {
    let stateBefore
    let action

    beforeEach(() => {
      stateBefore = {
        some: 'thing',
        numberOfUploads: 1,
        models: [
          {fileId: 1, progress: 0},
          {fileId: 2, progress: 0}
        ]
      }

      action = {
        type: TYPE.MODEL.FILE_UPLOADED,
        payload: {
          fileId: 1,
          modelId: 'some-model-id',
          thumbnailUrl: 'some-url',
          fileName: 'some-file.stl',
          fileUnit: 'mm',
          area: 100,
          volume: 200,
          dimensions: {x: 1, y: 2, z: 3}
        }
      }
    })

    it('updates model with given fileId', () => {
      expect(reducer(stateBefore, action).models, 'to equal', [
        {
          fileId: 1,
          progress: 1,
          uploadFinished: true,
          quantity: 1,
          modelId: 'some-model-id',
          thumbnailUrl: 'some-url',
          fileName: 'some-file.stl',
          fileUnit: 'mm',
          area: 100,
          volume: 200,
          dimensions: {x: 1, y: 2, z: 3}
        },
        {fileId: 2, progress: 0}
      ])
    })

    it('decrements numberOfUploads', () => {
      expect(reducer(stateBefore, action).numberOfUploads, 'to equal', 0)
    })

    describe('when actions contains error:', () => {
      let error

      beforeEach(() => {
        error = new FileUploadError(1)

        action.error = true
        action.payload = error
      })

      it('updates model with given fileId', () => {
        expect(reducer(stateBefore, action).models, 'to equal', [
          {
            fileId: 1,
            progress: 1,
            error
          },
          {fileId: 2, progress: 0}
        ])
      })

      it('decrements numberOfUploads', () => {
        expect(reducer(stateBefore, action).numberOfUploads, 'to equal', 0)
      })
    })
  })

  describe('handles TYPE.MODEL.FILE_DELETED:', () => {
    let stateBefore
    let action

    beforeEach(() => {
      stateBefore = {
        some: 'thing',
        models: [
          {fileId: 1},
          {fileId: 2}
        ]
      }

      action = {
        type: TYPE.MODEL.FILE_DELETED,
        payload: {fileId: 2}
      }
    })

    it('deletes file in models array', () => {
      expect(reducer(stateBefore, action), 'to equal', {
        some: 'thing',
        models: [{fileId: 1}]
      })
    })
  })

  describe('handles TYPE.DIRECT_SALES.RESTORE_CONFIGURATION:', () => {
    let stateBefore
    let action

    beforeEach(() => {
      stateBefore = {
        some: 'thing'
      }

      action = {
        type: TYPE.DIRECT_SALES.RESTORE_CONFIGURATION,
        payload: {items: [{
          thisIsItem: 'one'
        }, {
          thisIsItem: 'two'
        }]}
      }
    })

    it('updates the models array', () => {
      expect(reducer(stateBefore, action), 'to equal', {
        some: 'thing',
        models: [{
          thisIsItem: 'one',
          uploadFinished: true,
          fileId: 0
        }, {
          thisIsItem: 'two',
          uploadFinished: true,
          fileId: 1
        }]
      })
    })
  })
})
