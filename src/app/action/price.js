import {createAction} from 'redux-actions'

import TYPE from '../../../src/app/type'

export default function create ({printingEngine, materials}) {
  const createPriceRequest = ({ modelId }) => async dispatch => {
    const user = {
      currency: 'USD',
      shippingAddress: {
        city: 'Pittsburgh',
        zipCode: '15234',
        stateCode: 'PA',
        countryCode: 'US'
      }
    }

    const {userId} = await printingEngine.createUser({user})
    const materials = await printingEngine.listMaterials()
    const materialId = Object.keys(materials)[0]

    const {priceId} = await printingEngine.createPriceRequest({
      userId,
      modelId,
      materialId
    })

    dispatch(createAction(TYPE.PRICE.REQUEST_CREATED)(priceId))
  }

  return {
    createPriceRequest
  }
}
