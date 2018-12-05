import Fuse from 'fuse.js'

import {Material} from '../type'

export const createMaterialSearch = (materials: Material[]) => {
  // Get contained printing services
  const printingServices = Object.keys(
    materials[0].finishGroups[0].materialConfigs[0].printingService
  )

  const fuse = new Fuse<any>(materials, {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      {name: 'name', weight: 1},
      {name: 'finishGroups.name', weight: 0.8},
      ...printingServices.map(printingService => ({
        name: `finishGroups.materialConfigs.printingService.${printingService}.materialName`,
        weight: 0.6
      })),
      ...printingServices.map(printingService => ({
        name: `finishGroups.materialConfigs.printingService.${printingService}.printingMethod`,
        weight: 0.6
      })),
      {name: 'descriptionShort', weight: 0.4},
      {name: 'finishGroups.descriptionShort', weight: 0.4}
    ]
  })

  return {
    search: (term: string) => fuse.search(term)
  }
}
