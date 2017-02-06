import {bindActionCreators} from 'redux'

import * as printingEngine from '../lib/printing-engine'
import * as actionCreator from '../action-creator'

// Epics

export const getMaterials = () => async (dispatch) => {
  const {materialReceived} = bindActionCreators(actionCreator, dispatch)

  const materials = await printingEngine.listMaterials()
  return materialReceived(materials)
}

export const selectMaterial = actionCreator.materialSelected

