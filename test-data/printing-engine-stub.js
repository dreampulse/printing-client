import cartResponse from './mock/cart-response.json'
import priceResponse from './mock/price-response.json'
import materialResponse from './mock/material-list-response.json'
import * as printingEngine from '../src/app/lib/printing-engine'

printingEngine.uploadModel = () =>
  Promise.resolve({
    modelId: 'b364bd10-6d64-4515-b832-495d0fdf7d4c',
    thumbnailUrl: 'https://api.example.com/v1/model/some-model-id/thumbnail'
  })

printingEngine.getUploadStatus = () =>
  Promise.resolve(true)

printingEngine.listMaterials = () =>
  Promise.resolve(materialResponse)

printingEngine.createUser = () =>
  Promise.resolve({userId: 'c6807f8c-a1a1-44ed-85cf-9f34784e8d9f'})

printingEngine.updateUser = ({user}) =>
  Promise.resolve(user)

printingEngine.createPriceRequest = () =>
  Promise.resolve({priceId: '2baf30a1-3208-4f4f-bbb2-8f7b4fdccc7e'})

printingEngine.getPriceStatus = () =>
  Promise.resolve(true)

printingEngine.getPrice = () =>
  Promise.resolve(priceResponse)

printingEngine.createShoppingCart = () =>
  Promise.resolve({cartId: '2e7e6852-0c4f-43af-980a-427bbb0dae05'})

printingEngine.getFinalCartPrice = () =>
  Promise.resolve(cartResponse)

printingEngine.order = () =>
  Promise.resolve({orderId: '6f4f7685-185a-48de-8e5b-fdf497c9acf7'})
