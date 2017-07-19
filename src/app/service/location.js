
export const getBaseUrl = () => global.location.origin

export const reloadPage = () => global.location.reload()

export const hasInternalFlag = () => /[?&]internal/.test(global.location.search)
