import materials from './generated-material-structure.json'
import * as printingEngine from '../../src/app/lib/printing-engine'

printingEngine.uploadModel = () => Promise.resolve({modelId: '5a969cea-fa19-47a8-9a24-5cde671e0609'})
printingEngine.getUploadStatus = () => Promise.resolve(true)
printingEngine.listMaterials = () => Promise.resolve(materials)
printingEngine.createUser = () => Promise.resolve({userId: '009d58b7-a33d-4354-9eaa-1b6f408919d3'})
printingEngine.updateUser = () => Promise.resolve()
printingEngine.createPriceRequest = () => Promise.resolve({priceId: '9f4f7685-185a-48de-8e5b-fdf497c9acf7'})
printingEngine.getPriceStatus = () => Promise.resolve(true)
printingEngine.getPrice = () => Promise.resolve({})
printingEngine.createShoppingCart = () => Promise.resolve({cartId: '5a969cea-fa19-47a8-9a24-5cde671e0606'})
printingEngine.getFinalCartPrice = () => Promise.resolve({})
printingEngine.order = () => Promise.resolve({orderId: '6f4f7685-185a-48de-8e5b-fdf497c9acf7'})
