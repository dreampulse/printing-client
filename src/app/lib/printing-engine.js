// @flow

import type {Dispatch} from 'redux'

import config from '../../../config'
import type {
  ModelId,
  ModelOnProgressActionCreator,
  AppAction,
  PriceId,
  MaterialConfigId,
  User,
  UserId,
  Shipping,
  ShippingId,
  QuoteId,
  CartId,
  ConfigurationId,
  OrderId,
  PaymentId,
  BackendQuote,
  BackendModel,
  MaterialGroup
} from '../type-next'
import * as httpJson from './http-json'

// printing-engine types

type ModelResponse = BackendModel
type ShippingsResponse = Array<Shipping>

export type PriceRequest = {
  refresh: boolean,
  currency: string,
  countryCode: string,
  models: Array<{
    modelId: ModelId,
    quantity: number
  }>,
  materialConfigId: Array<MaterialConfigId>
}

export type PriceResponse = {
  priceId: string
}

export type QuotesResponse = {
  quotes: BackendQuote,
  allComplete: boolean,
  printingServiceComplete: {
    [printingServiceName: string]: boolean
  }
}

export type UserResponse = {
  userId: UserId
}

export type CartRequest = {
  userId: UserId,
  quoteIds: Array<QuoteId>,
  shippingIds: Array<ShippingId>,
  currency: string
}

export type CartResponse = {
  cartId: CartId,
  shippingIds: Array<ShippingId>,
  subTotalPrice: number,
  shippingTotal: number,
  vatPercentage: number,
  vatPrice: number,
  totalPrice: number,
  currency: string
}

export type ConfigurationRequest = {
  items: Array<{
    modelId: ModelId,
    quantity: 42
  }>
}

export type ConfigurationResponse = {
  configurationId: ConfigurationId
}

export type BackendConfiguration = {
  items: Array<BackendModel>,
  materialConfigId: MaterialConfigId
}

export type OrderRequest = {
  userId: UserId,
  cartId: CartId,
  currency: string,
  utmParams?: {
    source: string,
    medium: string,
    campaign: string,
    term: string,
    content: string
  }
}

export type OrderResponse = {
  orderId: OrderId,
  orderNumber: string
}

type PaymentRequest = {
  orderId: OrderId
}

type PaymentResponse = {
  paymentId: PaymentId
}

export type StripePaymentRequest = PaymentRequest & {
  token: string
}

export type StripePaymentResponse = PaymentRequest & {
  status: boolean
}

export type InvoicePaymentRequest = PaymentRequest & {
  token: string
}

export type InvoicePaymentResponse = PaymentRequest & {
  status: boolean
}

export type PaypalPaymentRequest = PaymentResponse

export type PaypalPaymentResponse = PaymentResponse & {
  providerFields: {
    // Warning: this is the paypal internal id not our payment id
    paymentId: string,
    redirectLink: string
  }
}

export type PaypalExecutePaymentRequest = {
  payerId: string // Internal paypal id
}

export type PaypalExecutePaymentResponse = {
  paymentId: string,
  status: boolean
}

export type MaterialGroupsResponse = {
  materialStructure: Array<MaterialGroup>
}

// Implementations

export const getMaterialGroups = async (): Promise<MaterialGroupsResponse> => {
  const response = await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/material`)
  return response.json
}

export const uploadModel = async (
  file: File,
  meta: {
    unit: string
  },
  dispatch: Dispatch<AppAction>,
  onProgressActionCreator: ModelOnProgressActionCreator
): Promise<ModelResponse> => {
  const response = await httpJson.upload({
    method: 'POST',
    url: `${config.printingEngineBaseUrl}/v3/model`,
    body: {
      file,
      unit: meta.unit
    },
    onProgress: progress => {
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
  const response = await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/price`, {method: 'POST', body: priceRequest})
  return response.json
}

export const getQuotes = async (priceId: PriceId): Promise<QuotesResponse> => {
  const response = await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/price/${priceId}`)
  return response.json
}

export const createUser = async (user: User): Promise<UserResponse> => {
  const response = await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/user`, {method: 'POST', body: user})
  return response.json
}

export const updateUser = async (userId: UserId, user: User): Promise<void> => {
  await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/user/${userId}`, {method: 'PUT', body: user})
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
  const response = await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/cart`, {method: 'POST', body: cart})
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
  const response = await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/configuration/${configurationId}`)
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
  const response = await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/payment/stripe`, {
    method: 'POST',
    body: payment
  })
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
  const response = await httpJson.fetch(`${config.printingEngineBaseUrl}/v3/payment/paypal/${paymentId}`, {
    method: 'PUT',
    body: executePayment
  })
  return response.json
}
