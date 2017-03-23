import priceResponse from './mock/price-response.json'
import materialResponse from './mock/material-list-response.json'
import * as printingEngine from '../src/app/lib/printing-engine'

printingEngine.uploadModel = () =>
  Promise.resolve({
    modelId: 'f390d85f-71b9-493d-833c-d3c0d78a5351',
    thumbnailUrl: 'http://localhost:8000/v1/model/f390d85f-71b9-493d-833c-d3c0d78a5351/thumbnail'
  })

printingEngine.getUploadStatus = () =>
  Promise.resolve(true)

printingEngine.listMaterials = () =>
  Promise.resolve(materialResponse)

printingEngine.createUser = () =>
  Promise.resolve({userId: 'a3dd5898-eb6a-4028-a494-3ffc414d254f'})

printingEngine.updateUser = () =>
  Promise.resolve()

printingEngine.createPriceRequest = () =>
  Promise.resolve({priceId: 'e0817235-ff34-49fb-9178-ba1558809cf0'})

printingEngine.getPriceStatus = () =>
  Promise.resolve(true)

printingEngine.getPrice = () =>
  Promise.resolve(priceResponse)

printingEngine.createShoppingCart = () =>
  Promise.resolve({cartId: 'a3992c96-22b3-4698-afab-dc4bddf76e13'})

printingEngine.getFinalCartPrice = () =>
  Promise.resolve({cartId: 'a3992c96-22b3-4698-afab-dc4bddf76e13'})

printingEngine.order = () =>
  Promise.resolve({orderId: '6f4f7685-185a-48de-8e5b-fdf497c9acf7'})
