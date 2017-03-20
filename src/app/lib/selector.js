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

export const selectCommonQuantity = (state) => {
  // Common quantity exists only if all models have the same individual quantity
  const {
    model: {
      models
    }
  } = state

  const keys = Object.keys(models)
  if (keys.length === 0) {
    return undefined
  }

  return keys.reduce((quantity, modelId) => {
    const modelQuantity = models[modelId].quantity
    if (quantity === null) {
      return modelQuantity
    }
    if (quantity === modelQuantity) {
      return quantity
    }
    return undefined
  }, null)
}

export const selectMaterialMenuValues = (state) => {
  const {
    price: {
      price
    },
    material: {
      materials
    },
    model: {
      models
    }
  } = state

  if (!materials || !materials.materialStructure) {
    return []
  }

  return materials.materialStructure.map(materialGroup => ({
    type: 'group',
    label: materialGroup.name,
    children: materialGroup.materials.map((material) => {
      const offer = getBestOfferForMaterial(material, price, models)
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

export const selectMaterial = (state, materialId) => {
  const {
    material: {
      materials
    }
  } = state

  if (!materials || !materials.materialStructure) {
    return null
  }

  // Search for material by id
  let material = null

  materials.materialStructure.forEach((materialGroup) => {
    materialGroup.materials.forEach((item) => {
      if (item.id === materialId) {
        material = item
      }
    })
  })

  return material
}

export const selectCurrentMaterial = (state) => {
  const {
    material: {
      selectedMaterial
    }
  } = state

  return selectMaterial(state, selectedMaterial)
}

export const selectOffers = (state) => {
  const {
    price: {
      price
    },
    material: {
      selectedMaterialConfig
    },
    model: {
      models
    }
  } = state

  return getOffersForMaterialConfig(selectedMaterialConfig, price, models)
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
