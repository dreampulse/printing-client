import {
  hasMaterialMultipleConfigs
} from 'Lib/material'

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
    children: materialGroup.materials.map(material => ({
      type: 'material',
      value: material.id,
      label: material.name,
      hasColor: hasMaterialMultipleConfigs(material),
      price: 'TODO'
    }))
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

export const selectOffers = (price, materialConfigId) => {
  if (!price) {
    return []
  }

  const vendors = Object.keys(price.printingService)
    .map(name => ({name, ...price.printingService[name]}))

  const offers = vendors.reduce((acc, vendor) => ([
    ...acc,
    vendor.shipping.map(shipping => ({
      name: vendor.name,
      items: vendor.items.filter((_, index) =>
        price.items[index].materialId === materialConfigId
      ),
      shipping,
      vatPercentage: vendor.vatPercentage,
      currency: vendor.currency
    }))
  ]), [])

  return offers
}
