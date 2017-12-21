import deepFreeze from 'deep-freeze'
import createHistory from 'history/createMemoryHistory'

import {init} from '../../../../src/app/action/init'

import * as printingEngine from '../../../../src/app/service/printing-engine'
import * as geolocation from '../../../../src/app/lib/geolocation'
import * as searchParams from '../../../../src/app/lib/search-params'

import materialList from '../../../../test-data/mock/material-list-response.json'

deepFreeze(materialList)

describe('Init action integration test', () => {
  let sandbox
  let store

  beforeEach(() => {
    store = createLegacyStore(createHistory())

    sandbox = sinon.sandbox.create()
    sandbox.stub(printingEngine)
    sandbox.stub(geolocation)
    sandbox.stub(searchParams)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('initializes the reducer correctly', async () => {
    printingEngine.listMaterials.resolves(materialList)
    printingEngine.createUser.resolves({userId: 'some-user-id'})
    geolocation.getLocationByIp.resolves({
      city: 'some-city',
      zipCode: 'some-zip-code',
      stateCode: 'some-state-code',
      countryCode: 'some-country-code'
    })
    searchParams.getUtmParams.returns({})

    await store.dispatch(init())

    // it sets up the user correctly
    expect(store.getState(), 'to satisfy', {
      user: {
        userId: 'some-user-id',
        user: {
          emailAddress: '',
          phoneNumber: '',
          currency: 'USD',
          isCompany: false,
          vatId: '',
          shippingAddress: {
            city: 'some-city',
            zipCode: 'some-zip-code',
            stateCode: 'some-state-code',
            countryCode: 'some-country-code'
          },
          billingAddress: {
            firstName: '',
            lastName: '',
            street: '',
            houseNumber: '',
            addressLine2: '',
            city: '',
            zipCode: '',
            stateCode: '',
            countryCode: ''
          }
        },
        utmParams: {}
      }
    })

    // it generates some material ids
    expect(store.getState().material.materials.materialStructure[0].id, 'to be ok')
  })
})
