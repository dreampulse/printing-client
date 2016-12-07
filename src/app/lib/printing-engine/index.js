import config from '../../config'
import RestApi from './rest-api'
import PrintingEngine from './printing-engine'

const restApi = RestApi({config})
export default PrintingEngine({restApi})
