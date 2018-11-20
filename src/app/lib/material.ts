import keyBy from 'lodash/keyBy'
import flatMap from 'lodash/flatMap'
import config from '../../../config'
import {MaterialGroup} from '../type'

export const getMaterialGroupLookupTable = (materialGroups: MaterialGroup[]) =>
  keyBy(materialGroups, materialGroup => materialGroup.id)

export const getMaterialLookupTable = (materialGroups: MaterialGroup[]) =>
  keyBy(flatMap(materialGroups, materialGroup => materialGroup.materials), item => item.id)

export const getFinishGroupLookupTable = (materialGroups: MaterialGroup[]) =>
  keyBy(
    flatMap(materialGroups, materialGroup =>
      flatMap(materialGroup.materials, material => material.finishGroups)
    ),
    item => item.id
  )

export const getMaterialConfigLookupTable = (materialGroups: MaterialGroup[]) =>
  keyBy(
    flatMap(materialGroups, materialGroup =>
      flatMap(materialGroup.materials, material =>
        flatMap(material.finishGroups, finishGroup => finishGroup.materialConfigs)
      )
    ),
    item => item.id
  )

export function getProviderName(vendorId: keyof typeof config.providerNames) {
  return config.providerNames[vendorId] || vendorId
}
