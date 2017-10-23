import priceResponse from './mock/price-response.json'
import materialResponse from './mock/material-list-response.json'
import * as printingEngine from '../src/app/lib/printing-engine'

printingEngine.uploadModel = () =>
  Promise.resolve({
    modelId: 'da4b474e-a98a-4708-be09-612ce3cdbaa3',
    thumbnailUrl: 'http://localhost:8000/v1/model/da4b474e-a98a-4708-be09-612ce3cdbaa3/thumbnail'
  })

printingEngine.getUploadStatus = () => Promise.resolve(true)

printingEngine.listMaterials = () => Promise.resolve(materialResponse)

printingEngine.createUser = () => Promise.resolve({userId: 'a3dd5898-eb6a-4028-a494-3ffc414d254f'})

printingEngine.updateUser = () => Promise.resolve()

printingEngine.createPriceRequest = () =>
  Promise.resolve({priceId: 'a788de06-c7e0-46ca-a5fa-0e46086b7530'})

printingEngine.getPriceStatus = () => Promise.resolve(true)

printingEngine.getPrice = () => Promise.resolve(priceResponse)

printingEngine.getPriceWithStatus = () =>
  Promise.resolve({
    price: priceResponse,
    isComplete: true
  })

printingEngine.createShoppingCart = () =>
  Promise.resolve({cartId: 'a3992c96-22b3-4698-afab-dc4bddf76e13'})

printingEngine.getFinalCartPrice = () =>
  Promise.resolve({cartId: 'a3992c96-22b3-4698-afab-dc4bddf76e13'})

printingEngine.order = () => Promise.resolve({orderId: '6f4f7685-185a-48de-8e5b-fdf497c9acf7'})
