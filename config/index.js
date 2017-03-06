import developmentSettings from './development'
import productionSettings from './production'

function chooseConfig () {
  if (process.env.NODE_ENV === 'production') {
    return productionSettings
  }
  return developmentSettings
}

export default chooseConfig()
