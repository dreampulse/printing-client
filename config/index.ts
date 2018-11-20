import developmentSettings from './development'
import productionSettings from './production'
import defaultConfig from './default'

function chooseConfig() {
  if (process.env.NODE_ENV === 'production') {
    return productionSettings
  }
  return developmentSettings
}

const config: typeof defaultConfig = chooseConfig()

export default config
