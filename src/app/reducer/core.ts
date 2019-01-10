import {loop, Cmd, LoopReducer, Loop} from 'redux-loop'
import invariant from 'invariant'
import isEqual from 'lodash/isEqual'
import keyBy from 'lodash/keyBy'
import uniq from 'lodash/uniq'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import zip from 'lodash/zip'
import compact from 'lodash/compact'

import {getLocationFromCookie, isLocationValid} from '../lib/geolocation'
import {
  resetModelConfigs,
  hasModelConfigWithQuote,
  setQuotesAndShippingInModelConfigs
} from '../lib/model'
import {
  getMaterialGroupLookupTable,
  getMaterialLookupTable,
  getFinishGroupLookupTable,
  getMaterialConfigLookupTable
} from '../lib/material'
import * as printingEngine from '../lib/printing-engine'
import {singletonPromise} from '../lib/promise'
import {PriceRequest} from '../lib/printing-engine'
import {getValidCurrency} from '../lib/currency'
import {
  MaterialGroup,
  Material,
  FinishGroup,
  MaterialConfig,
  Location,
  Features,
  UploadingFile,
  BackendModel,
  Quote,
  ModelConfig,
  ConfigId,
  PollingId,
  Shipping,
  User,
  Cart,
  PaymentId,
  UrlParams,
  UserId,
  PollingStatus,
  ModelConfigUploaded
} from '../type'

import {Actions} from '../action'
import * as coreActions from '../action/core'
import * as modalActions from '../action/modal'
import * as modelActions from '../action/model'
import * as pollingActions from '../action/polling'
import * as quoteActions from '../action/quote'
import * as cartActions from '../action/cart'
import * as orderActions from '../action/order'
import * as configurationActions from '../action/configuration'

export type CoreState = {
  materialGroups: {[materialGroupId: string]: MaterialGroup}
  materials: {[materialId: string]: Material}
  finishGroups: {[finishGroupId: string]: FinishGroup}
  materialConfigs: {[materialConfigId: string]: MaterialConfig}
  currency: string | null
  unit: string
  useSameMaterial: boolean
  location: Location | null
  shippings: Shipping[]
  featureFlags: Features
  urlParams: UrlParams
  uploadingFiles: {[fileId: string]: UploadingFile}
  backendModels: {[modelId: string]: BackendModel}
  modelConfigs: ModelConfig[]
  selectedModelConfigs: ConfigId[]
  quotes: {[quoteId: string]: Quote}
  quotePollingId: PollingId | null
  printingServiceComplete: {
    [printingServiceName: string]: boolean
  }
  user: User | null
  cart: Cart | null
  paymentId: PaymentId | null
  orderNumber: string | null
}

type CoreReducer = CoreState | Loop<CoreState, Actions>

const initialState: CoreState = {
  materialGroups: {},
  materials: {},
  finishGroups: {},
  materialConfigs: {},
  currency: null,
  unit: 'mm',
  useSameMaterial: true,
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

const createPriceRequestSingleton = singletonPromise()

const init = (
  state: CoreState,
  {payload: {featureFlags, urlParams}}: coreActions.InitAction
): CoreReducer =>
  loop(
    {
      ...state,
      featureFlags,
      urlParams
    },
    Cmd.list([
      Cmd.run<Actions>(printingEngine.getMaterialGroups, {
        successActionCreator: response =>
          coreActions.updateMaterialGroups(response.materialStructure),
        failActionCreator: coreActions.fatalError,
        args: []
      }),
      Cmd.run<Actions>(getLocationFromCookie, {
        successActionCreator: coreActions.updateLocation,
        failActionCreator: () => modalActions.openPickLocationModal({confirmation: false}),
        args: []
      })
    ])
  )

const fatalError = (
  state: CoreState,
  {payload: error}: coreActions.FatalErrorAction
): CoreReducer => {
  // Ignore promise cancelled errors (e.g. when price request got cancelled)
  if (error.name === 'PromiseCancelledError') {
    return state
  }

  return loop(
    state,
    Cmd.list<Actions>([
      Cmd.action(modalActions.openFatalErrorModal(error)),
      Cmd.run<Actions>(() => {
        // This will re-throw the error
        throw error
      })
    ])
  )
}

const updateMaterialGroups = (
  state: CoreState,
  action: coreActions.UpdateMaterialGroupsAction
): CoreReducer => ({
  ...state,
  materialGroups: getMaterialGroupLookupTable(action.payload.materialGroups),
  materials: getMaterialLookupTable(action.payload.materialGroups),
  finishGroups: getFinishGroupLookupTable(action.payload.materialGroups),
  materialConfigs: getMaterialConfigLookupTable(action.payload.materialGroups)
})

const updateLocation = (
  state: CoreState,
  action: coreActions.UpdateLocationAction
): CoreReducer => {
  const currency = state.currency || getValidCurrency(action.payload.location.countryCode)

  const nextState = {
    ...state,
    location: action.payload.location,
    currency
  }

  // No side effects if location did not change
  if (isEqual(state.location, action.payload.location)) {
    return nextState
  }

  if (!isLocationValid(action.payload.location)) {
    return loop(
      {
        ...state,
        location: null
      },
      Cmd.action(modalActions.openPickLocationModal({confirmation: false}))
    )
  }

  if (
    !action.payload.force &&
    (state.location && state.location.countryCode !== action.payload.location.countryCode) &&
    hasModelConfigWithQuote(state.modelConfigs)
  ) {
    return loop(
      state,
      Cmd.action(
        modalActions.openConfirmLocationChangeModal({
          location: action.payload.location,
          previousLocation: state.location
        })
      )
    )
  }

  // Reset parts of state if countryCode changes
  if (state.location && state.location.countryCode !== action.payload.location.countryCode) {
    nextState.quotes = {}
    nextState.modelConfigs = resetModelConfigs(state.modelConfigs)
    nextState.user = null
    nextState.cart = null
  }

  return loop(
    nextState,
    Cmd.run<Actions>(printingEngine.getShippings, {
      args: [action.payload.location.countryCode, currency],
      successActionCreator: coreActions.updateShippings,
      failActionCreator: coreActions.fatalError
    })
  )
}

const updateUnit = (state: CoreState, action: coreActions.UpdateUnitAction): CoreReducer => ({
  ...state,
  unit: action.payload.unit
})

const updateUseSameMaterial = (
  state: CoreState,
  action: coreActions.UpdateUseSameMaterialAction
): CoreReducer => ({
  ...state,
  useSameMaterial: action.payload
})

const updateCurrency = (
  state: CoreState,
  action: coreActions.UpdateCurrencyAction
): CoreReducer => {
  // Do nothing if currency did not change
  if (state.currency === action.payload.currency) {
    return state
  }

  if (!action.payload.force && hasModelConfigWithQuote(state.modelConfigs)) {
    return loop(
      state,
      Cmd.action(modalActions.openConfirmCurrencyChangeModal(action.payload.currency))
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
    Cmd.run<Actions>(printingEngine.getShippings, {
      args: [state.location && state.location.countryCode, action.payload.currency],
      successActionCreator: coreActions.updateShippings,
      failActionCreator: coreActions.fatalError
    })
  )
}

const updateShippings = (
  state: CoreState,
  action: coreActions.UpdateShippingsAction
): CoreReducer => ({
  ...state,
  shippings: action.payload
})

const saveUser = (state: CoreState, action: coreActions.SaveUserAction): CoreReducer =>
  loop(
    {
      ...state,
      location: {
        ...pick(action.payload.shippingAddress, 'city', 'zipCode', 'stateCode', 'countryCode')
      },
      user: {
        ...state.user,
        ...action.payload,
        billingAddress: action.payload.useDifferentBillingAddress
          ? action.payload.billingAddress
          : action.payload.shippingAddress
      }
    },
    Cmd.run<Actions>(
      (user: User, userId: UserId) => {
        const finalUser = omit(user, 'saveAddress', 'liableForVat')

        return userId
          ? printingEngine.updateUser(userId, finalUser)
          : printingEngine.createUser(finalUser)
      },
      {
        args: [action.payload, state.user && state.user.userId],
        successActionCreator: coreActions.userReceived,
        failActionCreator: coreActions.fatalError
      }
    )
  )

const userReceived = (state: CoreState, action: coreActions.UserReceivedAction): CoreReducer => ({
  ...state,
  user: {
    ...(state.user as User),
    userId: action.payload.userId,
    liableForVat: action.payload.liableForVat
  }
})

const uploadFile = (state: CoreState, {payload}: modelActions.UploadFileAction): CoreReducer => {
  const fileId = payload.fileId

  const file = {
    fileId,
    fileName: payload.file.name,
    fileSize: payload.file.size,
    progress: 0,
    error: false
  }

  return loop<CoreState, Actions>(
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
    Cmd.run<Actions>(printingEngine.uploadModel, {
      args: [
        payload.file,
        {unit: payload.unit},
        Cmd.dispatch,
        (progress: number) => modelActions.uploadProgress(fileId, progress)
      ],
      successActionCreator: models =>
        modelActions.uploadComplete(fileId, models, payload.fileIndex),
      failActionCreator: error => modelActions.uploadFail(fileId, error)
    })
  )
}

const uploadFiles = (
  state: CoreState,
  {payload: {files, unit}}: modelActions.UploadFilesAction
): CoreReducer =>
  loop(
    state,
    Cmd.list(files.map((file, index) => Cmd.action(modelActions.uploadFile(file, unit, index))))
  )

const uploadProgress = (
  state: CoreState,
  {payload}: modelActions.UploadProgressAction
): CoreReducer => {
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

const uploadComplete = (
  state: CoreState,
  {payload}: modelActions.UploadCompleteAction
): CoreReducer => {
  const fileId = payload.fileId
  const models = payload.models
  const [model, ...additionalModels] = models

  const modelConfig = state.modelConfigs.find(
    item => item.type === 'UPLOADING' && item.fileId === fileId
  ) as ModelConfig

  invariant(models.length > 0, 'At least one model required')
  invariant(modelConfig, 'Model config not found')
  invariant(state.uploadingFiles[fileId], `Error in uploadComplete(): File ${fileId} is unknown`)
  invariant(
    payload.additionalConfigIds.length === additionalModels.length,
    'Length of additionalModels out of sync'
  )

  const additionalModelConfigs = zip(additionalModels, payload.additionalConfigIds).map<
    ModelConfigUploaded
  >(([m, configId]) => ({
    type: 'UPLOADED',
    quantity: 1,
    modelId: (m && m.modelId) || '-1',
    id: configId || '-1',
    quoteId: null,
    shippingId: null
  }))

  let selectedModelConfigs: string[] = [
    ...state.selectedModelConfigs,
    modelConfig.id,
    ...additionalModelConfigs.map<string>(m => m.id)
  ]

  if (!state.useSameMaterial) {
    selectedModelConfigs = payload.fileIndex === 0 ? [modelConfig.id] : state.selectedModelConfigs
  }

  return {
    ...state,
    backendModels: {
      ...state.backendModels,
      ...keyBy(models, 'modelId')
    },
    modelConfigs: [
      ...state.modelConfigs.map(item =>
        item.type === 'UPLOADING' && item.fileId === fileId
          ? ({
              type: 'UPLOADED',
              quantity: 1,
              modelId: model.modelId,
              id: item.id,
              quoteId: null,
              shippingId: null
            } as ModelConfigUploaded)
          : item
      ),
      ...additionalModelConfigs
    ],
    selectedModelConfigs
  }
}

const uploadFail = (state: CoreState, {payload}: modelActions.UploadFailAction): CoreReducer => {
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

const deleteModelConfigs = (
  state: CoreState,
  {payload}: modelActions.DeleteModelConfigsAction
): CoreReducer => {
  const modelConfigsToDelete = state.modelConfigs.filter(
    modelConfig => payload.ids.indexOf(modelConfig.id) > -1
  )
  const isModelConfigInCart = modelConfigsToDelete.some(modelConfig =>
    Boolean(modelConfig.type === 'UPLOADED' && modelConfig.quoteId)
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
    return loop(nextState, Cmd.action(cartActions.createCart()))
  }

  return nextState
}

const updateSelectedModelConfigs = (
  state: CoreState,
  {payload}: modelActions.UpdateSelectedModelConfigsAction
) => ({
  ...state,
  selectedModelConfigs: payload.ids
})

const updateQuantities = (
  state: CoreState,
  {payload}: modelActions.UpdateQuantitiesAction
): CoreReducer => {
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

const duplicateModelConfig = (
  state: CoreState,
  {payload: {id, nextId}}: modelActions.DuplicateModelConfigAction
): CoreReducer => {
  const modelConfig = state.modelConfigs.find(item => item.id === id) as ModelConfig

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

const receiveQuotes = (
  state: CoreState,
  {payload: {countryCode, currency, modelConfigs, refresh}}: quoteActions.ReceiveQuotesAction
): CoreReducer => {
  const priceRequest: PriceRequest = {
    refresh,
    countryCode,
    currency,
    models: modelConfigs.map(modelConfig => ({
      modelId: modelConfig.modelId,
      quantity: modelConfig.quantity
    }))
  }

  const createPriceRequestCmd = Cmd.run<Actions>(
    () => createPriceRequestSingleton(printingEngine.createPriceRequest(priceRequest)),
    {
      successActionCreator: quoteActions.startPollingQuotes,
      failActionCreator: coreActions.fatalError
    }
  )

  // Is polling still in progress
  if (state.quotePollingId) {
    // Cancel old polling, start a new one
    const cancelPollingCmd = Cmd.action(pollingActions.cancel(state.quotePollingId))
    return loop(state, Cmd.list([cancelPollingCmd, createPriceRequestCmd], {sequence: true}))
  }

  // Start a new price request
  return loop(state, createPriceRequestCmd)
}

const startPollingQuotes = (
  state: CoreState,
  {payload: {priceId}}: quoteActions.StartPollingQuotesAction
): CoreReducer => {
  const startPollingAction = pollingActions.start({
    pollingFunction: async () => {
      const quotesResponse = await printingEngine.getQuotes(priceId)
      if (quotesResponse.allComplete) {
        return {
          status: PollingStatus.POLLING_DONE,
          result: quotesResponse
        }
      }

      // Continue polling to get more results
      return {
        status: PollingStatus.POLLING_CONTINUE,
        result: quotesResponse
      }
    },
    onSuccessActionCreator: quoteActions.quotesComplete,
    onPartialResultActionCreator: quoteActions.quotesReceived,
    onFailActionCreator: coreActions.fatalError
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

const quotesReceived = (
  state: CoreState,
  {payload: {quotes, printingServiceComplete}}: quoteActions.QuotesReceived
): CoreReducer => ({
  ...state,
  quotes: {
    ...state.quotes,
    ...keyBy(quotes, 'quoteId')
  },
  printingServiceComplete
})

const quotesComplete = (state: CoreState, {payload}: quoteActions.QuotesComplete) =>
  loop(
    {
      ...state,
      quotePollingId: null
    },
    Cmd.action(quoteActions.quotesReceived(payload))
  )

const stopReceivingQuotes = (state: CoreState) => {
  // Check if we have to quit some active polling
  if (state.quotePollingId) {
    return loop(
      {
        ...state,
        quotePollingId: null,
        printingServiceComplete: {}
      },
      Cmd.action(pollingActions.cancel(state.quotePollingId))
    )
  }

  return state
}

const addToCart = (
  state: CoreState,
  {payload: {configIds, quotes, shipping}}: cartActions.AddToCartAction
) =>
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
    Cmd.action(cartActions.createCart())
  )

const createCart = (state: CoreState): CoreReducer => {
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
    Cmd.run<Actions>(printingEngine.createCart, {
      args: [
        {
          shippingIds,
          quoteIds,
          currency
        }
      ],
      successActionCreator: cartActions.cartReceived,
      failActionCreator: coreActions.fatalError
    })
  )
}

const cartReceived = (
  state: CoreState,
  {payload: {cart}}: cartActions.CartReceivedAction
): CoreReducer => ({
  ...state,
  cart
})

const paid = (
  state: CoreState,
  {payload: {paymentId, orderNumber}}: orderActions.PaidAction
): CoreReducer => ({
  ...state,
  paymentId,
  orderNumber
})

const executePaypalPayment = (
  state: CoreState,
  {payload}: orderActions.ExecutePaypalPaymentAction
): CoreReducer =>
  loop(
    state,
    Cmd.run<Actions>(printingEngine.executePaypalPayment, {
      args: [state.paymentId, {payerId: payload.payerID}]
    })
  )

const loadConfiguration = (
  state: CoreState,
  {payload: {id}}: configurationActions.LoadConfigurationAction
): CoreReducer =>
  loop(
    state,
    Cmd.run<Actions>(printingEngine.getConfiguration, {
      args: [id],
      successActionCreator: configurationActions.configurationReceived,
      failActionCreator: coreActions.fatalError
    })
  )

const configurationReceived = (
  state: CoreState,
  {payload: {items}}: configurationActions.ConfigurationReceivedAction
): CoreReducer => {
  const modelConfigs = items.map(
    item =>
      ({
        id: item.id,
        quoteId: null,
        shippingId: null,
        modelId: item.modelId,
        quantity: item.quantity,
        type: 'UPLOADED'
      } as ModelConfigUploaded)
  )

  const backendModels: {[modelId: string]: BackendModel} = {}
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

const reset = (state: CoreState): CoreReducer => ({
  ...state,
  ...omit(initialState, 'materialGroups', 'location', 'featureFlags', 'shippings', 'urlParams'),
  user: {
    ...omit(state.user, 'userId')
  }
})

export const reducer = (state: CoreState = initialState, action: Actions): CoreReducer => {
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
    case 'CORE.UPDATE_USE_SAME_MATERIAL':
      return updateUseSameMaterial(state, action)
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
      return stopReceivingQuotes(state)
    case 'CART.ADD_TO_CART':
      return addToCart(state, action)
    case 'CART.CREATE_CART':
      return createCart(state)
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