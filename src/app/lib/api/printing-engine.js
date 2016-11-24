export default ({fetch}) => {
  const baseUrl = 'https://printing-engine.all3dp.com/v1';

  const upload = (fileFormField, unit) => {
    const data = new FormData();
    data.append('file', fileFormField);
    data.append('unit', unit);

    return fetch(baseUrl + '/model', {
      method: 'POST',
      body: data
    })
  };

  const listMaterials = () => {
    return fetch(baseUrl + '/material')
      .then(response => response.json())
  };

  const createUser = ({currency, city, zipCode, stateCode, countryCode}) => {
    return fetch(baseUrl + '/material', {
      method: 'POST',
      body: {currency, shippingAddress: {city, zipCode, stateCode, countryCode} }
    })
      .then(response => response.json())
  };

  const createPriceRequest = ({modelId, materialId, userId}) => {
    return fetch(baseUrl + '/price', {
      method: 'POST',
      body: {items: [{modelId, materialId}], userId}
    })
      .then(response => response.json())
  };

  const getPrice = ({priceId}) => {
    return fetch(`${baseUrl}/price/${priceId}`)
      .then(response => response.json())
  };

  return {
    upload,
    listMaterials,
    createUser,
    priceRequest,
    createPriceRequest,
    getPrice
  }
}
