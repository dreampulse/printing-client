import developmentSettings from './development'
import productionSettings from './production'
import cypressSettings from './cypress'

function chooseConfig() {
  if (process.env.NODE_ENV === 'cypress') {
    return cypressSettings
  }
  if (process.env.NODE_ENV === 'production') {
    return productionSettings
  }
  return developmentSettings
}

export default chooseConfig()
