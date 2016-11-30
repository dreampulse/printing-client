export default ({fetch}) => {
  const baseUrl = 'http://localhost:8000/v1';

  const upload = (form, onProgressChange) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', event => {
      if (event.lengthComputable) {
        const progress = event.loaded / event.total;
        onProgressChange(progress)
      }
    });

    const promise = new Promise((resolve, reject) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.responseText);
          }
        }
      };
    });

    xhr.open('POST', baseUrl + '/model');
    xhr.send(form);

    return promise;
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
    createPriceRequest,
    getPrice
  }
}
