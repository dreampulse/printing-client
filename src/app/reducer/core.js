// @flow

import {loop, Cmd} from 'redux-loop'
import invariant from 'invariant'
import isEqual from 'lodash/isEqual'
import keyBy from 'lodash/keyBy'
import uniq from 'lodash/uniq'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import compact from 'lodash/compact'

import config from '../../../config'
import {getLocationByIp, isLocationValid} from '../lib/geolocation'
import {
  resetModelConfigs,
  hasModelConfigWithQuote,
  setQuotesAndShippingInModelConfigs
} from '../lib/model'
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
  Shipping,
  User,
  Cart,
  PaymentId,
  UrlParams
} from '../type'

import * as coreAction from '../action/core'
import * as modalAction from '../action/modal'
import * as modelAction from '../action/model'
import * as pollingAction from '../action/polling'
import * as quoteAction from '../action/quote'
import * as cartAction from '../action/cart'
import * as configurationAction from '../action/configuration'

export type CoreState = {
  materialGroups: Array<MaterialGroup>, // This is the material-structure-Tree
  currency: string,
  unit: string,
  location: ?Location,
  shippings: Array<Shipping>,
  featureFlags: Features,
  urlParams: UrlParams,
  uploadingFiles: {[id: FileId]: UploadingFile},
  backendModels: {[id: ModelId]: BackendModel},
  modelConfigs: Array<ModelConfig>,
  selectedModelConfigs: Array<ConfigId>,
  quotes: {[id: QuoteId]: Quote},
  quotePollingId: ?PollingId,
  printingServiceComplete: {
    [printingServiceName: string]: boolean
  },
  user: ?User,
  cart: ?Cart,
  paymentId: ?PaymentId,
  orderNumber: ?string
}

const initialState: CoreState = {
  materialGroups: [],
  currency: config.defaultCurrency,
  unit: 'mm',
  location: null,
  shippings: [],
  featureFlags: {},
  urlParams: {},
  uploadingFiles: {},
  backendModels: {},
  modelConfigs: [],
  selectedModelConfigs: [],
  quotePollingId: null,
  quotes: {},
  printingServiceComplete: {},
  user: null,
  cart: null,
  paymentId: null,
  orderNumber: null
}

const init = (state, {payload: {featureFlags, urlParams}}) =>
  loop(
    {
      ...state,
      featureFlags,
      urlParams
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
        failActionCreator: modalAction.openPickLocationModal,
        args: []
      })
    ])
  )

const fatalError = (state, {payload: error}) =>
  loop(
    state,
    Cmd.list([
      Cmd.action(modalAction.openFatalErrorModal(error)),
      Cmd.run(() => {
        // This will re-throw the error
        throw error
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
      Cmd.action(modalAction.openPickLocationModal())
    )
  }

  if (
    !action.payload.force &&
    (state.location && state.location.countryCode !== action.payload.location.countryCode) &&
    hasModelConfigWithQuote(state.modelConfigs)
  ) {
    return loop(
      state,
      Cmd.action(modalAction.openConfirmLocationChangeModal(action.payload.location))
    )
  }

  const nextState = {
    ...state,
    location: action.payload.location
  }

  // Reset parts of state if countryCode changes
  if (state.location && state.location.countryCode !== action.payload.location.countryCode) {
    nextState.quotes = {}
    nextState.modelConfigs = resetModelConfigs(state.modelConfigs)
    nextState.cart = null
  }

  return loop(
    nextState,
    Cmd.list([
      Cmd.action(quoteAction.stopReceivingQuotes()),
      Cmd.run(printingEngine.getShippings, {
        args: [action.payload.location.countryCode, state.currency],
        successActionCreator: coreAction.updateShippings,
        failActionCreator: coreAction.fatalError
      })
    ])
  )
}

const updateUnit = (state, action) => ({
  ...state,
  unit: action.payload.unit
})

const updateCurrency = (state, action) => {
  // Do nothing if currency did not change
  if (state.currency === action.payload.currency) {
    return state
  }

  if (!action.payload.force && hasModelConfigWithQuote(state.modelConfigs)) {
    return loop(
      state,
      Cmd.action(modalAction.openConfirmCurrencyChangeModal(action.payload.currency))
    )
  }

  return loop(
    {
      ...state,
      currency: action.payload.currency,
      quotes: {},
      modelConfigs: resetModelConfigs(state.modelConfigs),
      cart: null
    },
    Cmd.list([
      Cmd.action(quoteAction.stopReceivingQuotes()),
      Cmd.run(printingEngine.getShippings, {
        args: [state.location && state.location.countryCode, action.payload.currency],
        successActionCreator: coreAction.updateShippings,
        failActionCreator: coreAction.fatalError
      })
    ])
  )
}

const updateShippings = (state, action) => ({
  ...state,
  shippings: action.payload
})

const saveUser = (state, action) =>
  loop(
    {
      ...state,
      location: {
        ...pick(action.payload.shippingAddress, 'city', 'zipCode', 'stateCode', 'countryCode')
      },
      user: {
        ...state.user,
        ...action.payload,
        billingAddress: action.payload.billingAddress
          ? action.payload.billingAddress
          : action.payload.shippingAddress
      }
    },
    Cmd.run(
      (user, userId) =>
        userId ? printingEngine.updateUser(userId, user) : printingEngine.createUser(user),
      {
        args: [action.payload, state.user && state.user.userId],
        successActionCreator: coreAction.userReceived,
        failActionCreator: coreAction.fatalError
      }
    )
  )

const userReceived = (state, action) => ({
  ...state,
  user: {
    ...state.user,
    userId:
      action.payload && action.payload.userId
        ? action.payload.userId
        : state.user && state.user.userId
  }
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
        {unit: payload.unit},
        Cmd.dispatch,
        progress => modelAction.uploadProgress(fileId, progress)
      ],
      successActionCreator: model => modelAction.uploadComplete(fileId, model),
      failActionCreator: error => modelAction.uploadFail(fileId, error)
    })
  )
}

const uploadFiles = (state, {payload: {files, unit}}) =>
  loop(state, Cmd.list(files.map(file => Cmd.action(modelAction.uploadFile(file, unit)))))

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
  const modelConfig: any = state.modelConfigs.find(
    item => item.type === 'UPLOADING' && item.fileId === fileId
  )

  invariant(modelConfig, 'Model config not found')
  invariant(state.uploadingFiles[fileId], `Error in uploadComplete(): File ${fileId} is unknown`)

  return {
    ...state,
    backendModels: {
      ...state.backendModels,
      [model.modelId]: model
    },
    modelConfigs: state.modelConfigs.map(
      item =>
        item.type === 'UPLOADING' && item.fileId === fileId
          ? {
              type: 'UPLOADED',
              quantity: 1,
              modelId: model.modelId,
              id: item.id,
              quoteId: null,
              shippingId: null
            }
          : item
    ),
    selectedModelConfigs: [...state.selectedModelConfigs, modelConfig.id]
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

const deleteModelConfigs = (state, {payload}) => {
  const modelConfigsToDelete = state.modelConfigs.filter(
    modelConfig => payload.ids.indexOf(modelConfig.id) > -1
  )
  const isModelConfigInCart = modelConfigsToDelete.some(
    modelConfig => modelConfig.type === 'UPLOADED' && modelConfig.quoteId
  )

  invariant(
    modelConfigsToDelete.length === payload.ids.length,
    'Unknown model config ids provided.'
  )

  const nextState = {
    ...state,
    modelConfigs: state.modelConfigs.filter(
      modelConfig => payload.ids.indexOf(modelConfig.id) === -1
    ),
    selectedModelConfigs: state.selectedModelConfigs.filter(id => payload.ids.indexOf(id) === -1)
  }

  // Create new cart if a least one model config was deleted from cart
  if (isModelConfigInCart) {
    return loop(nextState, Cmd.action(cartAction.createCart()))
  }

  return nextState
}

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
    id: nextId,
    quoteId: null,
    shippingId: null
  }

  return {
    ...state,
    modelConfigs: [
      ...state.modelConfigs.slice(0, modelConfigIndex + 1),
      nextModelConfig,
      ...state.modelConfigs.slice(modelConfigIndex + 1)
    ],
    selectedModelConfigs: [...state.selectedModelConfigs, nextId]
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
      quotePollingId: startPollingAction.payload.pollingId,
      printingServiceComplete: {}
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
  loop(
    {
      ...state,
      quotePollingId: null
    },
    Cmd.action(quoteAction.quotesReceived(payload))
  )

const stopReceivingQuotes = (state, _action) => {
  // Check if we have to quit some active polling
  if (state.quotePollingId) {
    return loop(
      {
        ...state,
        quotePollingId: null,
        printingServiceComplete: {}
      },
      Cmd.action(pollingAction.cancel(state.quotePollingId))
    )
  }

  return state
}

const addToCart = (state, {payload: {configIds, quotes, shipping}}) =>
  loop(
    {
      ...state,
      modelConfigs: setQuotesAndShippingInModelConfigs(
        state.modelConfigs,
        configIds,
        quotes,
        shipping
      )
    },
    Cmd.action(cartAction.createCart())
  )

const createCart = (state, _action) => {
  const modelConfigs = state.modelConfigs.filter(
    modelConfig => modelConfig.type === 'UPLOADED' && modelConfig.quoteId !== null
  )
  const currency = state.currency
  const shippingIds = compact(
    uniq(modelConfigs.map(modelConfig => modelConfig.type === 'UPLOADED' && modelConfig.shippingId))
  )
  const quoteIds = compact(
    modelConfigs.map(modelConfig => modelConfig.type === 'UPLOADED' && modelConfig.quoteId)
  )
  const nextState = {
    ...state,
    cart: null // Clear old cart
  }

  if (modelConfigs.length === 0) {
    return nextState
  }

  invariant(shippingIds.length > 0, 'Shippings for cart creation missing.')
  invariant(quoteIds.length > 0, 'Quotes for cart creation missing.')

  return loop(
    nextState,
    Cmd.run(printingEngine.createCart, {
      args: [
        {
          shippingIds,
          quoteIds,
          currency
        }
      ],
      successActionCreator: cartAction.cartReceived,
      failActionCreator: coreAction.fatalError
    })
  )
}

const cartReceived = (state, {payload: {cart}}) => ({
  ...state,
  cart
})

const paid = (state, {payload: {paymentId, orderNumber}}) => ({
  ...state,
  paymentId,
  orderNumber
})

const executePaypalPayment = (state, {payload}) =>
  loop(
    state,
    Cmd.run(printingEngine.executePaypalPayment, {
      args: [state.paymentId, {payerId: payload.payerID}]
    })
  )

const loadConfiguration = (state, {payload: {id}}) =>
  loop(
    state,
    Cmd.run(printingEngine.getConfiguration, {
      args: [id],
      successActionCreator: configurationAction.configurationReceived,
      failActionCreator: coreAction.fatalError
    })
  )

const configurationReceived = (state, {payload: {items}}) => {
  const modelConfigs = items.map(item => ({
    id: item.id,
    quoteId: null,
    shippingId: null,
    modelId: item.modelId,
    quantity: item.quantity,
    type: 'UPLOADED'
  }))

  const backendModels = {}
  items.forEach(item => {
    backendModels[item.modelId] = omit(item, 'quantity')
  })

  return {
    ...state,
    modelConfigs,
    backendModels,
    selectedModelConfigs: modelConfigs.map(modelConfig => modelConfig.id)
  }
}

const reset = state => ({
  ...state,
  ...omit(initialState, 'materialGroups', 'location', 'featureFlags', 'shippings', 'urlParams'),
  user: {
    ...omit(state.user, 'userId')
  }
})

export const reducer = (state: CoreState = initialState, action: AppAction): CoreState => {
  switch (action.type) {
    case 'CORE.INIT':
      return init(state, action)
    case 'CORE.FATAL_ERROR':
      return fatalError(state, action)
    case 'CORE.UPDATE_MATERIAL_GROUPS':
      return updateMaterialGroups(state, action)
    case 'CORE.UPDATE_LOCATION':
      return updateLocation(state, action)
    case 'CORE.UPDATE_UNIT':
      return updateUnit(state, action)
    case 'CORE.UPDATE_CURRENCY':
      return updateCurrency(state, action)
    case 'CORE.UPDATE_SHIPPINGS':
      return updateShippings(state, action)
    case 'CORE.SAVE_USER':
      return saveUser(state, action)
    case 'CORE.USER_RECEIVED':
      return userReceived(state, action)
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
      return stopReceivingQuotes(state, action)
    case 'CART.ADD_TO_CART':
      return addToCart(state, action)
    case 'CART.CREATE_CART':
      return createCart(state, action)
    case 'CART.CART_RECEIVED':
      return cartReceived(state, action)
    case 'ORDER.PAID':
      return paid(state, action)
    case 'ORDER.EXECUTE_PAYPAL_PAYMENT':
      return executePaypalPayment(state, action)
    case 'CONFIGURATION.LOAD_CONFIGURATION':
      return loadConfiguration(state, action)
    case 'CONFIGURATION.CONFIGURATION_RECEIVED':
      return configurationReceived(state, action)
    case 'CORE.RESET':
      return reset(state)
    default:
      return state
  }
}

export default reducer