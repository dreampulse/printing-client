import config from '../../../../config'
import * as httpJson from '../../../../src/app/lib/http-json'
import {
  getMaterialGroups,
  uploadModel,
  getModel,
  createPriceRequest,
  getQuotes,
  createUser,
  updateUser,
  getShippings,
  createCart,
  createConfiguration,
  getConfiguration,
  createOrder,
  createStripePayment,
  createInvoicePayment,
  createPaypalPayment,
  executePaypalPayment
} from '../../../../src/app/lib/printing-engine'
import getFileMock from '../../../mock/file'

describe('printing-engine lib', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(config, 'printingEngineBaseUrl').value('SOME-BASE-URL')
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('getMaterialGroups()', () => {
    let materialGroupsMock

    beforeEach(() => {
      materialGroupsMock = {}
      sandbox.stub(httpJson, 'fetch').resolves({
        json: materialGroupsMock
      })
    })

    it('calls httpJson.fetch() with the correct URL', async () => {
      await getMaterialGroups()
      expect(httpJson.fetch, 'to have a call satisfying', [`SOME-BASE-URL/v3/material`])
    })

    it('returns the material groups which is the json property from httpJson.fetch()', async () => {
      const result = await getMaterialGroups('some-model-id')

      expect(result, 'to be', materialGroupsMock)
    })
  })

  describe('uploadModel()', () => {
    let fileMock
    let responseMock
    let modelMock
    let dispatchMock
    let onProgressActionCreatorMock

    beforeEach(() => {
      fileMock = getFileMock()
      responseMock = {}
      modelMock = {}
      dispatchMock = sinon.spy()
      onProgressActionCreatorMock = progress => ({progress})
      sandbox.stub(httpJson, 'upload').resolves({
        json: modelMock,
        http: responseMock
      })
    })

    it('calls httpJson.upload() with the correct upload options', async () => {
      await uploadModel(fileMock, {unit: 'mm'}, dispatchMock, onProgressActionCreatorMock)
      expect(httpJson.upload, 'to have a call satisfying', [
        {method: 'POST', url: `SOME-BASE-URL/v3/model`, body: {file: fileMock, unit: 'mm'}}
      ])
    })

    it('returns the backend model which is the json property from httpJson.upload()', async () => {
      const model = await uploadModel(
        fileMock,
        {unit: 'mm'},
        dispatchMock,
        onProgressActionCreatorMock
      )
      expect(model, 'to be', modelMock)
    })

    it('dispatches an action using the onProgressActionCreator each time the onProgress handler is called', async () => {
      await uploadModel(fileMock, {unit: 'mm'}, dispatchMock, onProgressActionCreatorMock)

      const onProgressHandler = httpJson.upload.firstCall.args[0].onProgress

      onProgressHandler(1)
      onProgressHandler(2)
      onProgressHandler(3)

      expect(dispatchMock.firstCall.args, 'to satisfy', [{progress: 1}])
      expect(dispatchMock.secondCall.args, 'to satisfy', [{progress: 2}])
      expect(dispatchMock.thirdCall.args, 'to satisfy', [{progress: 3}])
    })
  })

  describe('getModel()', () => {
    let responseMock
    let modelMock

    beforeEach(() => {
      responseMock = {}
      modelMock = {}
      sandbox.stub(httpJson, 'fetch').resolves({
        json: modelMock,
        http: responseMock
      })
    })

    it('calls httpJson.fetch() with the correct URL', async () => {
      await getModel('some-model-id')
      expect(httpJson.fetch, 'to have a call satisfying', [`SOME-BASE-URL/v3/model/some-model-id`])
    })

    it('returns an object that provides a model property and an isComplete property', async () => {
      const result = await getModel('some-model-id')
      expect(result, 'to equal', modelMock)
    })
  })

  describe('createPriceRequest()', () => {
    let result

    beforeEach(async () => {
      sandbox.stub(httpJson, 'fetch').resolves({
        json: 'some-price-result'
      })

      result = await createPriceRequest('some-price-request')
    })

    it('calls httpJson.fetch() with the correct URL', () =>
      expect(httpJson.fetch, 'to have a call satisfying', [
        `SOME-BASE-URL/v3/price`,
        {method: 'POST', body: 'some-price-request'}
      ]))

    it('returns the json result', () => expect(result, 'to equal', 'some-price-result'))
  })

  describe('getQuotes()', () => {
    let result

    beforeEach(async () => {
      sandbox.stub(httpJson, 'fetch').resolves({
        json: 'some-quotes-result'
      })

      result = await getQuotes('some-price-id')
    })

    it('calls httpJson.fetch() with the correct URL', () =>
      expect(httpJson.fetch, 'to have a call satisfying', [`SOME-BASE-URL/v3/price/some-price-id`]))

    it('returns the json result', () => expect(result, 'to equal', 'some-quotes-result'))
  })

  describe('createUser()', () => {
    let result

    beforeEach(async () => {
      sandbox.stub(httpJson, 'fetch').resolves({
        json: 'some-user-result'
      })

      result = await createUser('some-user-request')
    })

    it('calls httpJson.fetch() with the correct URL', () =>
      expect(httpJson.fetch, 'to have a call satisfying', [
        `SOME-BASE-URL/v3/user`,
        {method: 'POST', body: 'some-user-request'}
      ]))

    it('returns the json result', () => expect(result, 'to equal', 'some-user-result'))
  })

  describe('updateUser()', () => {
    let result

    beforeEach(async () => {
      sandbox.stub(httpJson, 'fetch').resolves({
        json: null
      })

      result = await updateUser('some-user-id', 'some-user-request')
    })

    it('calls httpJson.fetch() with the correct URL', () =>
      expect(httpJson.fetch, 'to have a call satisfying', [
        `SOME-BASE-URL/v3/user/some-user-id`,
        {method: 'PUT', body: 'some-user-request'}
      ]))

    it('returns the json result', () => expect(result, 'to be undefined'))
  })

  describe('getShippings()', () => {
    let result

    beforeEach(async () => {
      sandbox.stub(httpJson, 'fetch').resolves({
        json: 'some-shippings-result'
      })

      result = await getShippings('some-country-code', 'some-currency')
    })

    it('calls httpJson.fetch() with the correct URL', () =>
      expect(httpJson.fetch, 'to have a call satisfying', [
        `SOME-BASE-URL/v3/shipping/some-country-code?currency=some-currency`
      ]))

    it('returns the json result', () => expect(result, 'to equal', 'some-shippings-result'))
  })

  describe('createCart()', () => {
    let result

    beforeEach(async () => {
      sandbox.stub(httpJson, 'fetch').resolves({
        json: 'some-cart-result'
      })

      result = await createCart('some-cart-request')
    })

    it('calls httpJson.fetch() with the correct URL', () =>
      expect(httpJson.fetch, 'to have a call satisfying', [
        `SOME-BASE-URL/v3/cart`,
        {method: 'POST', body: 'some-cart-request'}
      ]))

    it('returns the json result', () => expect(result, 'to equal', 'some-cart-result'))
  })

  describe('createConfiguration()', () => {
    let result

    beforeEach(async () => {
      sandbox.stub(httpJson, 'fetch').resolves({
        json: 'some-configuration-result'
      })

      result = await createConfiguration('some-configuration-request')
    })

    it('calls httpJson.fetch() with the correct URL', () =>
      expect(httpJson.fetch, 'to have a call satisfying', [
        `SOME-BASE-URL/v3/configuration`,
        {method: 'POST', body: 'some-configuration-request'}
      ]))

    it('returns the json result', () => expect(result, 'to equal', 'some-configuration-result'))
  })

  describe('getConfiguration()', () => {
    let result

    beforeEach(async () => {
      sandbox.stub(httpJson, 'fetch').resolves({
        json: 'some-configuration-result'
      })

      result = await getConfiguration('some-configuration-id')
    })

    it('calls httpJson.fetch() with the correct URL', () =>
      expect(httpJson.fetch, 'to have a call satisfying', [
        `SOME-BASE-URL/v3/configuration/some-configuration-id`
      ]))

    it('returns the json result', () => expect(result, 'to equal', 'some-configuration-result'))
  })

  describe('createOrder()', () => {
    let result

    beforeEach(async () => {
      sandbox.stub(httpJson, 'fetch').resolves({
        json: 'some-order-result'
      })

      result = await createOrder('some-order-request')
    })

    it('calls httpJson.fetch() with the correct URL', () =>
      expect(httpJson.fetch, 'to have a call satisfying', [
        `SOME-BASE-URL/v3/order`,
        {method: 'POST', body: 'some-order-request'}
      ]))

    it('returns the json result', () => expect(result, 'to equal', 'some-order-result'))
  })

  describe('createStripePayment()', () => {
    let result

    beforeEach(async () => {
      sandbox.stub(httpJson, 'fetch').resolves({
        json: 'some-stripe-payment-result'
      })

      result = await createStripePayment('some-stripe-payment-request')
    })

    it('calls httpJson.fetch() with the correct URL', () =>
      expect(httpJson.fetch, 'to have a call satisfying', [
        `SOME-BASE-URL/v3/payment/stripe`,
        {method: 'POST', body: 'some-stripe-payment-request'}
      ]))

    it('returns the json result', () => expect(result, 'to equal', 'some-stripe-payment-result'))
  })

  describe('createInvoicePayment()', () => {
    let result

    beforeEach(async () => {
      sandbox.stub(httpJson, 'fetch').resolves({
        json: 'some-invoice-payment-result'
      })

      result = await createInvoicePayment('some-invoice-payment-request')
    })

    it('calls httpJson.fetch() with the correct URL', () =>
      expect(httpJson.fetch, 'to have a call satisfying', [
        `SOME-BASE-URL/v3/payment/invoice`,
        {method: 'POST', body: 'some-invoice-payment-request'}
      ]))

    it('returns the json result', () => expect(result, 'to equal', 'some-invoice-payment-result'))
  })

  describe('createPaypalPayment()', () => {
    let result

    beforeEach(async () => {
      sandbox.stub(httpJson, 'fetch').resolves({
        json: 'some-paypal-payment-result'
      })

      result = await createPaypalPayment('some-paypal-payment-request')
    })

    it('calls httpJson.fetch() with the correct URL', () =>
      expect(httpJson.fetch, 'to have a call satisfying', [
        `SOME-BASE-URL/v3/payment/paypal`,
        {method: 'POST', body: 'some-paypal-payment-request'}
      ]))

    it('returns the json result', () => expect(result, 'to equal', 'some-paypal-payment-result'))
  })

  describe('executePaypalPayment()', () => {
    let result

    beforeEach(async () => {
      sandbox.stub(httpJson, 'fetch').resolves({
        json: 'some-execute-paypal-payment-result'
      })

      result = await executePaypalPayment('some-payment-id', 'some-execute-paypal-payment-request')
    })

    it('calls httpJson.fetch() with the correct URL', () =>
      expect(httpJson.fetch, 'to have a call satisfying', [
        `SOME-BASE-URL/v3/payment/paypal/some-payment-id`,
        {method: 'PUT', body: 'some-execute-paypal-payment-request'}
      ]))

    it('returns the json result', () =>
      expect(result, 'to equal', 'some-execute-paypal-payment-result'))
  })
})
