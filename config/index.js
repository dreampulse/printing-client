import developmentSettings from './development'
import productionSettings from './production'

let config = developmentSettings

if (process.env.NODE_ENV === 'production') {
  config = productionSettings
}

export default config
