export function generateMaterialIds (materials) {
  materials.materialStructure.forEach((materialGroup, groupIndex) => {
    materialGroup.id = `group-${groupIndex}`

    materialGroup.materials.forEach((material, materialIndex) => {
      material.id = `material-${groupIndex}-${materialIndex}`

      material.finishGroups.forEach((finishGroup, finishGroupIndex) => {
        finishGroup.id = `finishgroup-${groupIndex}-${materialIndex}-${finishGroupIndex}`
      })
    })
  })
}

export function hasMaterialMultipleConfigs (material) {
  return !material.finishGroups.every(
    finishGroup => (finishGroup.materialConfigs.length <= 1)
  )
}

export function getDefaultMaterialConfigs (materials) {
  const defaultConfigs = {}

  materials.materialStructure.forEach((materialGroup) => {
    materialGroup.materials.forEach((material) => {
      material.finishGroups.forEach((finishGroup) => {
        // Always pick the first config as default
        defaultConfigs[finishGroup.id] = finishGroup.materialConfigs[0].id
      })
    })
  })

  return defaultConfigs
}
