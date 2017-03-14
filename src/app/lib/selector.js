import {
  hasMaterialMultipleConfigs,
  getOffersForMaterialConfig,
  getBestOfferForMaterial
} from 'Lib/material'
import {
  formatPrice
} from 'Lib/formatter'

export const selectCartItems = state =>
  state.cart.cart.items.map(cartItem => ({
    ...cartItem,
    ...state.model.models[cartItem.modelId]
  }))

export const selectCart = (state) => {
  // TODO: should be calculated at the server: https://github.com/all3dp/printing-engine/issues/66
  // This is only a temporaty solution
  const cartItems = selectCartItems(state)
  const cart = state.cart.cart

  const subTotal = () =>
    cartItems.reduce((acc, cartItem) => acc + (cartItem.price * cartItem.quantity), 0)

  const shippingTotal = () =>
    cart.shipping.reduce((acc, shipping) => acc + shipping.price, 0)

  const vatTotal = () =>
    Math.round(((subTotal() + shippingTotal()) * cart.vatPercentage) * 100) / 100

  const totalPrice = () =>
    subTotal() + shippingTotal() + vatTotal()

  return {
    ...cart,
    subTotal: subTotal(),
    shippingTotal: shippingTotal(),
    vatTotal: vatTotal(),
    totalPrice: totalPrice()
  }
}

export const selectMaterialMenuValues = (state) => {
  const {
    price: {
      price
    },
    material: {
      materials
    }
  } = state

  if (!materials || !materials.materialStructure) {
    return []
  }

  return materials.materialStructure.map(materialGroup => ({
    type: 'group',
    label: materialGroup.name,
    children: materialGroup.materials.map((material) => {
      const offer = getBestOfferForMaterial(material, price)
      return {
        type: 'material',
        value: material.id,
        label: material.name,
        hasColor: hasMaterialMultipleConfigs(material),
        price: offer ? `From ${formatPrice(offer.price, offer.offer.currency)}` : undefined
      }
    })
  }))
}

export const selectCurrentMaterial = (state) => {
  const {
    material: {
      materials,
      selectedMaterial
    }
  } = state

  if (!materials || !materials.materialStructure) {
    return []
  }

  // Search for material by name
  let currentMaterial = null

  materials.materialStructure.forEach((materialGroup) => {
    materialGroup.materials.forEach((material) => {
      if (material.id === selectedMaterial) {
        currentMaterial = material
      }
    })
  })

  return currentMaterial
}

export const selectOffers = (state) => {
  const {
    price: {
      price
    },
    material: {
      selectedMaterialConfig
    }
  } = state

  return getOffersForMaterialConfig(selectedMaterialConfig, price)
}

export const selectPrintingServiceRequests = (state) => {
  const {
    price: {
      price
    }
  } = state

  if (!price) {
    return null
  }

  return Object.keys(price.printingService)
    .reduce((acc, name) => ({
      complete: acc.complete + (price.printingService[name].requestComplete ? 1 : 0),
      total: acc.total + 1
    }), {
      complete: 0,
      total: 0
    })
}
