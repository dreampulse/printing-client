import {createAction} from 'redux-actions'

// import TYPE from '../../../src/app/type'

export default function create ({api, materials}) {
  const createPriceRequest = () => async dispatch => {
    const user = {
      currency: 'USD',
      shippingAddress: {
        city: 'Pittsburgh',
        zipCode: '15234',
        stateCode: 'PA',
        countryCode: 'US'
      }
    }

    const {userId} = await api.printingEngine.createUser({user})

    const materials = await api.printingEngine.getMaterials()
    console.log("-- materials", materials);
    const materialId = Object.keys(materials)[0]

    const {priceId} = await api.printingEngine.createPriceRequest({
      modelId,
      materialId
    })

    console.log("-- priceId", priceId)

    // dispatch(createAction(TYPE.MATERIAL.RECEIVED)(materials))
  }

  return {
    createPriceRequest
  }
}
