// NO FLOW HERE BECAUSE FLOW DOESN'T IMPLEMENT LODASH keyBy, flatMap CORRECTLY
import keyBy from 'lodash/keyBy'
import flatMap from 'lodash/flatMap'
import config from '../../../config'

export const getMaterialGroupLookupTable = materialGroups =>
  keyBy(materialGroups, materialGroup => materialGroup.id)

export const getMaterialLookupTable = materialGroups =>
  keyBy(flatMap(materialGroups, materialGroup => materialGroup.materials), item => item.id)

export const getFinishGroupLookupTable = materialGroups =>
  keyBy(
    flatMap(materialGroups, materialGroup =>
      flatMap(materialGroup.materials, material => material.finishGroups)
    ),
    item => item.id
  )

export const getMaterialConfigLookupTable = materialGroups =>
  keyBy(
    flatMap(materialGroups, materialGroup =>
      flatMap(materialGroup.materials, material =>
        flatMap(material.finishGroups, finishGroup => finishGroup.materialConfigs)
      )
    ),
    item => item.id
  )

export function getProviderName(vendorId) {
  return config.providerNames[vendorId] || vendorId
}
