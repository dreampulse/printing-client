import {Dispatch} from 'redux'

import config from '../../../config'
import {
  ModelId,
  ModelOnProgressActionCreator,
  PriceId,
  MaterialConfigId,
  CartOffer,
  UserId,
  Shipping,
  ShippingId,
  QuoteId,
  CartId,
  ConfigurationId,
  OrderId,
  CartOfferId,
  PaymentId,
  Quote,
  BackendModel,
  MaterialGroup,
  Cart,
  UtmParams,
  Address
} from '../type'
import {Actions} from '../action'
import * as httpJson from './http-json'

// printing-engine types

type ModelUploadResponse = BackendModel[]
type ModelResponse = BackendModel
type ShippingsResponse = Shipping[]

export type PriceRequest = {
  refresh: boolean
  currency: string
  countryCode: string
  models: Array<{
    modelId: ModelId
    quantity: number
  }>
  materialConfigIds?: MaterialConfigId[]
}

export type PriceResponse = {
  priceId: string
}

export type QuotesResponse = {
  quotes: Quote[]
  allComplete: boolean
  printingServiceComplete: {
    [printingServiceName: string]: boolean
  }
}

export type UserPayload = {
  emailAddress: string
  isCompany: boolean
  companyName?: string
  vatId?: string
  phoneNumber: string
  useDifferentBillingAddress: boolean
  shippingAddress: Address
  billingAddress?: Address
}

export type UserResponse = {
  userId: UserId
  liableForVat: boolean
}

export type CartRequest = {
  quoteIds: QuoteId[]
  shippingIds: ShippingId[]
  currency: string
}

export type CartResponse = Cart

export type CreateCartOfferRequest = {
  cartId: CartId
}

export type CreateCartOfferResponse = {
  offerId: CartOfferId
}

export type CartOfferResponse = CartOffer

export type ConfigurationRequest = {
  items: Array<{
    modelId: ModelId
    quantity: 42
  }>
}

export type ConfigurationResponse = {
  configurationId: ConfigurationId
}

export type BackendConfiguration = {
  items: Array<BackendModel & {quantity: number}>
  materialConfigId: MaterialConfigId
}

export type OrderRequest = {
  userId: UserId
  cartId: CartId
  utmParams?: UtmParams
}

export type OrderResponse = {
  orderId: OrderId
  orderNumber: string
}

type PaymentRequest = {
  orderId: OrderId
}

type PaymentResponse = {
  paymentId: PaymentId
}

export type StripePaymentRequest = PaymentRequest

export type StripePaymentResponse = {
  sessionId: string
}

export type InvoicePaymentRequest = PaymentRequest & {
  token: string
}

export type InvoicePaymentResponse = PaymentResponse & {
  status: boolean
}

export type PaypalPaymentRequest = PaymentRequest

export type PaypalPaymentResponse = PaymentResponse & {
  providerFields: {
    // Warning: this is the paypal internal id not our payment id
    paymentId: string
    redirectLink: string
  }
}

export type PaypalExecutePaymentRequest = {
  payerId: string // Internal paypal id
}

export type PaypalExecutePaymentResponse = {
  paymentId: string
  status: boolean
}

export type MaterialGroupsResponse = {
  materialStructure: MaterialGroup[]
}

// Implementations

export const getMaterialGroups = async (): Promise<MaterialGroupsResponse> => {
  const response = await httpJson.fetchWithRetry(`${config.printingEngineBaseUrl}/v3/material`)
  return response.json
}

export const uploadModel = async (
  file: File,
  meta: {
    unit: string
  },
  dispatch: Dispatch<Actions>,
  onProgressActionCreator: ModelOnProgressActionCreator,
  refresh = false
): Promise<ModelUploadResponse> => {
  const response = await httpJson.upload({
    method: 'POST',
    url: `${config.printingEngineBaseUrl}/v3/model`,
    body: {
      file,
      unit: meta.unit,
      refresh
    },
    onProgress: (progress: number) => {
      dispatch(onProgressActionCreator(progress))
    }
  })

  return response.json
}

export const getModel = async (modelId: ModelId): Promise<ModelResponse> => {
  const response = await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/model/${modelId}`)
  return response.json
}

export const createPriceRequest = async (priceRequest: PriceRequest): Promise<PriceResponse> => {
  const response = await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/price`, {
    method: 'POST',
    body: priceRequest
  })
  return response.json
}

export const getQuotes = async (priceId: PriceId): Promise<QuotesResponse> => {
  const response = await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/price/${priceId}`)
  return response.json
}

export const createUser = async (user: UserPayload): Promise<UserResponse> => {
  const response = await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/user`, {
    method: 'POST',
    body: user
  })
  return response.json
}

export const updateUser = async (userId: UserId, user: UserPayload): Promise<UserResponse> => {
  const response = await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/user/${userId}`, {
    method: 'PUT',
    body: user
  })
  return response.json
}

export const getShippings = async (
  countryCode: string,
  currency: string
): Promise<ShippingsResponse> => {
  const response = await httpJson.fetch(
    `${config.printingEngineBaseUrl}/v3/shipping/${countryCode}?currency=${currency}`
  )
  return response.json
}

export const createCart = async (cart: CartRequest): Promise<CartResponse> => {
  const response = await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/cart`, {
    method: 'POST',
    body: cart
  })
  return response.json
}

export const createOffer = async (
  offer: CreateCartOfferRequest
): Promise<CreateCartOfferResponse> => {
  const response = await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/offer`, {
    method: 'POST',
    body: offer
  })
  return response.json
}

export const getOffer = async (
  offerId: CartOfferId,
  currency: string
): Promise<CartOfferResponse> => {
  const response = await httpJson.fetch(
    `${config.printingEngineBaseUrl}/v3/offer/${offerId}/cart?currency=${currency}`
  )
  return response.json
}

export const getOfferConfiguration = async (
  offerId: CartOfferId
): Promise<BackendConfiguration> => {
  const response = await httpJson.fetch(
    `${config.printingEngineBaseUrl}/v3/offer/${offerId}/configuration`
  )
  return response.json
}

export const createConfiguration = async (
  configuration: ConfigurationRequest
): Promise<ConfigurationResponse> => {
  const response = await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/configuration`, {
    method: 'POST',
    body: configuration
  })
  return response.json
}

export const getConfiguration = async (
  configurationId: ConfigurationId
): Promise<BackendConfiguration> => {
  const response = await httpJson.fetch(
    `${config.printingEngineBaseUrl}/v3/configuration/${configurationId}`
  )
  return response.json
}

export const createOrder = async (order: OrderRequest): Promise<OrderResponse> => {
  const response = await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/order`, {
    method: 'POST',
    body: order
  })
  return response.json
}

export const createStripePayment = async (
  payment: StripePaymentRequest
): Promise<StripePaymentResponse> => {
  const response = await httpJson.fetch(
    `${config.printingEngineBaseUrl}/v3/payment/stripe/checkout`,
    {
      method: 'POST',
      body: payment
    }
  )
  return response.json
}

export const createInvoicePayment = async (
  payment: InvoicePaymentRequest
): Promise<InvoicePaymentResponse> => {
  const response = await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/payment/invoice`, {
    method: 'POST',
    body: payment
  })
  return response.json
}

export const createPaypalPayment = async (
  payment: PaypalPaymentRequest
): Promise<PaypalPaymentResponse> => {
  const response = await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/payment/paypal`, {
    method: 'POST',
    body: payment
  })
  return response.json
}

export const executePaypalPayment = async (
  paymentId: PaymentId,
  executePayment: PaypalExecutePaymentRequest
): Promise<PaypalExecutePaymentResponse> => {
  const response = await httpJson.fetch(
    `${config.printingEngineBaseUrl}/v3/payment/paypal/${paymentId}`,
    {
      method: 'PUT',
      body: executePayment
    }
  )
  return response.json
}

export enum OrderStatusType {
  ORDER_PLACED = 'placed',
  PRODUCTION_STARTED = 'in_production',
  ORDER_SHIPPED = 'shipped',
  ORDER_RECEIVED = 'received'
}

export type OrderStatus = {
  type: OrderStatusType
  date: string
}

export type OrderStatusResponse = {
  orderNumber: string
  cancelled: boolean
  orderStatus: OrderStatus[]
}

export const getOrderStatus = async (orderId: OrderId): Promise<OrderStatusResponse> => {
  const response = await httpJson.fetch(
    `${config.printingEngineBaseUrl}/v3/order/${orderId}/status`
  )
  return response.json
}
