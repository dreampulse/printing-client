// @flow

import {loop, Cmd} from 'redux-loop'
import invariant from 'invariant'
import isEqual from 'lodash/isEqual'
import keyBy from 'lodash/keyBy'

import config from '../../../config'
import {getLocationByIp, isLocationValid} from '../lib/geolocation'
import {resetModelConfigs, hasModelConfigWithQuote} from '../lib/model'
import * as printingEngine from '../lib/printing-engine'
import type {PriceRequest} from '../lib/printing-engine'
import type {
  AppAction,
  MaterialGroup,
  Location,
  Features,
  UploadingFile,
  BackendModel,
  Quote,
  ModelConfig,
  ConfigId,
  FileId,
  ModelId,
  QuoteId,
  PollingId,
  Shipping
} from '../type-next'

import * as coreAction from '../action-next/core'
import * as modalAction from '../action-next/modal'
import * as modelAction from '../action-next/model'
import * as pollingAction from '../action-next/polling'
import * as quoteAction from '../action-next/quote'

export type CoreState = {
  materialGroups: Array<MaterialGroup>, // This is the material-structure-Tree
  currency: string,
  location: ?Location,
  shippings: Array<Shipping>,
  featureFlags: Features,
  uploadingFiles: {[id: FileId]: UploadingFile},
  backendModels: {[id: ModelId]: BackendModel},
  modelConfigs: Array<ModelConfig>,
  selectedModelConfigs: Array<ConfigId>,
  quotes: {[id: QuoteId]: Quote},
  quotePollingId: ?PollingId,
  printingServiceComplete: {
    [printingServiceName: string]: boolean
  }
}

const initialState: CoreState = {
  materialGroups: [],
  currency: config.defaultCurrency,
  location: null,
  shippings: [],
  featureFlags: {},
  uploadingFiles: {},
  backendModels: {},
  modelConfigs: [],
  selectedModelConfigs: [],
  quotePollingId: null,
  quotes: {},
  printingServiceComplete: {}
}

const init = (state, {payload: {featureFlags}}) =>
  loop(
    {
      ...state,
      featureFlags
    },
    Cmd.list([
      Cmd.run(printingEngine.getMaterialGroups, {
        successActionCreator: response =>
          coreAction.updateMaterialGroups(response.materialStructure),
        failActionCreator: coreAction.fatalError,
        args: []
      }),
      Cmd.run(getLocationByIp, {
        successActionCreator: coreAction.updateLocation,
        failActionCreator: modalAction.openPickLocation,
        args: []
      })
    ])
  )

const updateMaterialGroups = (state, action) => ({
  ...state,
  materialGroups: action.payload.materialGroups
})

const updateLocation = (state, action) => {
  // Do nothing if location did not change
  if (isEqual(state.location, action.payload.location)) {
    return state
  }

  if (!isLocationValid(action.payload.location)) {
    return loop(
      {
        ...state,
        location: null
      },
      Cmd.action(
        // TODO: show warning in PickLocationModal when action.payload.needsConfirmation is true
        modalAction.openPickLocation()
      )
    )
  }

  if (
    !action.payload.force &&
    (state.location && state.location.countryCode !== action.payload.location.countryCode) &&
    hasModelConfigWithQuote(state.modelConfigs)
  ) {
    return loop(state, Cmd.action(modalAction.openConfirmLocationChange(action.payload.location)))
  }

  return loop(
    {
      ...state,
      location: action.payload.location,
      quotes: {},
      modelConfigs: resetModelConfigs(state.modelConfigs)
      // TODO: clear cart
    },
    Cmd.list([
      Cmd.action(quoteAction.stopReceivingQuotes()),
      Cmd.run(printingEngine.getShippings, {
        args: [action.payload.location.countryCode, state.currency],
        successActionCreator: coreAction.updateShipping,
        failActionCreator: coreAction.fatalError
      })
    ])
  )
}

const updateCurrency = (state, action) => {
  // Do nothing if currency did not change
  if (state.currency === action.payload.currency) {
    return state
  }

  if (!action.payload.force && hasModelConfigWithQuote(state.modelConfigs)) {
    return loop(state, Cmd.action(modalAction.openConfirmCurrencyChange(action.payload.currency)))
  }

  const countryCode = state.location ? state.location.countryCode : config.defaultCurrency

  return loop(
    {
      ...state,
      currency: action.payload.currency,
      quotes: {},
      modelConfigs: resetModelConfigs(state.modelConfigs)
      // TODO: clear cart
    },
    Cmd.list([
      Cmd.action(quoteAction.stopReceivingQuotes()),
      Cmd.run(printingEngine.getShippings, {
        args: [countryCode, action.payload.currency],
        successActionCreator: coreAction.updateShipping,
        failActionCreator: coreAction.fatalError
      })
    ])
  )
}

const updateShipping = (state, action) => ({
  ...state,
  shippings: action.payload
})

const uploadFile = (state, {payload}) => {
  const fileId = payload.fileId

  const file = {
    fileId,
    fileName: payload.file.name,
    fileSize: payload.file.size,
    progress: 0,
    error: false
  }

  return loop(
    {
      ...state,
      uploadingFiles: {
        ...state.uploadingFiles,
        [fileId]: file
      },
      modelConfigs: [
        ...state.modelConfigs,
        {
          type: 'UPLOADING',
          fileId,
          id: payload.configId
        }
      ]
    },
    Cmd.run(printingEngine.uploadModel, {
      args: [
        payload.file,
        // TODO: Should be configurable via the interface
        // @see https://github.com/all3dp/printing-engine-client/issues/622
        {unit: 'mm'},
        Cmd.dispatch,
        progress => modelAction.uploadProgress(fileId, progress)
      ],
      successActionCreator: model => modelAction.uploadComplete(fileId, model),
      failActionCreator: error => modelAction.uploadFail(fileId, error)
    })
  )
}

const uploadFiles = (state, {payload: files}) =>
  loop(state, Cmd.list(files.map(file => Cmd.action(modelAction.uploadFile(file)))))

const uploadProgress = (state, {payload}) => {
  const fileId = payload.fileId

  invariant(state.uploadingFiles[fileId], `Error in uploadProgress(): File ${fileId} is unknown`)

  return {
    ...state,
    uploadingFiles: {
      ...state.uploadingFiles,
      [fileId]: {
        ...state.uploadingFiles[fileId],
        progress: payload.progress
      }
    }
  }
}

const uploadComplete = (state, {payload}) => {
  const fileId = payload.fileId
  const model = payload.model

  invariant(state.uploadingFiles[fileId], `Error in uploadComplete(): File ${fileId} is unknown`)

  return {
    ...state,
    backendModels: {
      ...state.backendModels,
      [model.modelId]: model
    },
    modelConfigs: state.modelConfigs.map(
      modelConfig =>
        modelConfig.type === 'UPLOADING' && modelConfig.fileId === fileId
          ? {
              type: 'UPLOADED',
              quantity: 1,
              modelId: model.modelId,
              id: modelConfig.id,
              quoteId: null,
              shippingId: null
            }
          : modelConfig
    )
  }
}

const uploadFail = (state, {payload}) => {
  const fileId = payload.fileId

  invariant(state.uploadingFiles[fileId], `Error in uploadFail(): File ${fileId} is unknown`)

  return {
    ...state,
    uploadingFiles: {
      ...state.uploadingFiles,
      [fileId]: {
        ...state.uploadingFiles[fileId],
        error: true,
        errorMessage: payload.error.message
      }
    }
  }
}

const deleteModelConfigs = (state, {payload}) => ({
  ...state,
  modelConfigs: state.modelConfigs.filter(
    modelConfig => payload.ids.indexOf(modelConfig.id) === -1
  ),
  selectedModelConfigs: state.selectedModelConfigs.filter(id => payload.ids.indexOf(id) === -1)
})

const updateSelectedModelConfigs = (state, {payload}) => ({
  ...state,
  selectedModelConfigs: payload.ids
})

const updateQuantities = (state, {payload}) => {
  invariant(payload.quantity > 0, `Quantity has to be bigger than zero!`)

  return {
    ...state,
    modelConfigs: state.modelConfigs.map(modelConfig => {
      if (modelConfig.type === 'UPLOADING' || payload.ids.indexOf(modelConfig.id) === -1) {
        return modelConfig
      }
      return {
        ...modelConfig,
        quantity: payload.quantity
      }
    })
  }
}

const duplicateModelConfig = (state, {payload: {id, nextId}}) => {
  const modelConfig = state.modelConfigs.find(item => item.id === id)

  invariant(modelConfig, `Error in duplicateModelConfig(): Model Config id ${id} is unknown`)

  const modelConfigIndex = state.modelConfigs.indexOf(modelConfig)
  // Cause flow is crap!
  const nextModelConfig: any = {
    ...modelConfig,
    id: nextId
  }

  return {
    ...state,
    modelConfigs: [
      ...state.modelConfigs.slice(0, modelConfigIndex + 1),
      nextModelConfig,
      ...state.modelConfigs.slice(modelConfigIndex + 1)
    ]
  }
}

const receiveQuotes = (state, {payload: {countryCode, currency, modelConfigs, refresh}}) => {
  const priceRequest: PriceRequest = {
    refresh,
    countryCode,
    currency,
    models: modelConfigs.map(modelConfig => ({
      modelId: modelConfig.modelId,
      quantity: modelConfig.quantity
    }))
  }

  const createPriceRequestCmd = Cmd.run(printingEngine.createPriceRequest, {
    args: [priceRequest],
    successActionCreator: quoteAction.startPollingQuotes,
    failActionCreator: coreAction.fatalError
  })

  // Is polling still in progress
  if (state.quotePollingId) {
    // Cancel old polling, start a new one
    const cancelPollingCmd = Cmd.action(pollingAction.cancel(state.quotePollingId))
    return loop(state, Cmd.list([cancelPollingCmd, createPriceRequestCmd], {sequence: true}))
  }

  // Start a new price request
  return loop(state, createPriceRequestCmd)
}

const startPollingQuotes = (state, {payload: {priceId}}) => {
  const startPollingAction = pollingAction.start({
    pollingFunction: async () => {
      const quotesResponse = await printingEngine.getQuotes(priceId)
      if (quotesResponse.allComplete) {
        return {
          status: 'POLLING_DONE',
          result: quotesResponse
        }
      }

      // Continue polling to get more results
      return {
        status: 'POLLING_CONTINUE',
        result: quotesResponse
      }
    },
    onSuccessActionCreator: quoteAction.quotesComplete,
    onPartialResultActionCreator: quoteAction.quotesReceived,
    onFailActionCreator: coreAction.fatalError
  })

  return loop(
    {
      ...state,
      quotePollingId: startPollingAction.payload.pollingId
    },
    Cmd.action(startPollingAction)
  )
}

const quotesReceived = (state, {payload: {quotes, printingServiceComplete}}) => ({
  ...state,
  quotes: {
    ...state.quotes,
    ...keyBy(quotes, 'quoteId')
  },
  printingServiceComplete
})

const quotesComplete = (state, {payload}) =>
  loop({...state, quotePollingId: null}, Cmd.action(quoteAction.quotesReceived(payload)))

const stopReceivingQuotes = state => {
  if (state.quotePollingId) {
    return loop(
      {...state, quotePollingId: null},
      Cmd.action(pollingAction.cancel(state.quotePollingId))
    )
  }
  // Ignore if no polling is active
  return state
}

export const reducer = (state: CoreState = initialState, action: AppAction): CoreState => {
  switch (action.type) {
    case 'CORE.INIT':
      return init(state, action)
    case 'CORE.UPDATE_MATERIAL_GROUPS':
      return updateMaterialGroups(state, action)
    case 'CORE.UPDATE_LOCATION':
      return updateLocation(state, action)
    case 'CORE.UPDATE_CURRENCY':
      return updateCurrency(state, action)
    case 'CORE.UPDATE_SHIPPING':
      return updateShipping(state, action)
    case 'MODEL.UPLOAD_FILE':
      return uploadFile(state, action)
    case 'MODEL.UPLOAD_FILES':
      return uploadFiles(state, action)
    case 'MODEL.UPLOAD_PROGRESS':
      return uploadProgress(state, action)
    case 'MODEL.UPLOAD_COMPLETE':
      return uploadComplete(state, action)
    case 'MODEL.UPLOAD_FAIL':
      return uploadFail(state, action)
    case 'MODEL.DELETE_MODEL_CONFIGS':
      return deleteModelConfigs(state, action)
    case 'MODEL.UPDATE_SELECTED_MODEL_CONFIGS':
      return updateSelectedModelConfigs(state, action)
    case 'MODEL.UPDATE_QUANTITIES':
      return updateQuantities(state, action)
    case 'MODEL.DUPLICATE_MODEL_CONFIG':
      return duplicateModelConfig(state, action)
    case 'QUOTE.RECEIVE_QUOTES':
      return receiveQuotes(state, action)
    case 'QUOTE.START_POLLING_QUOTES':
      return startPollingQuotes(state, action)
    case 'QUOTE.QUOTES_RECEIVED':
      return quotesReceived(state, action)
    case 'QUOTE.QUOTES_COMPLETE':
      return quotesComplete(state, action)
    case 'QUOTE.STOP_RECEIVING_QUOTES':
      return stopReceivingQuotes(state)
    default:
      return state
  }
}

export default reducer
