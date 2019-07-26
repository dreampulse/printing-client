import {useState, useEffect} from 'react'

const useHasAdblocker = () => {
  const [hasAdblocker, setAdblocker] = useState(false)

  useEffect(() => {
    // Source: https://github.com/nsi88/adblockdetect/blob/master/index.js

    const blockedElement = global.document.createElement('div')
    blockedElement.className =
      'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads'
    blockedElement.setAttribute(
      'style',
      'position: absolute; top: -10px; left: -10px; width: 1px; height: 1px;'
    )
    global.document.body.appendChild(blockedElement)

    setAdblocker(
      global.window.document.body.getAttribute('abp') != null ||
        blockedElement.offsetParent == null ||
        blockedElement.offsetHeight == 0 ||
        blockedElement.offsetLeft == 0 ||
        blockedElement.offsetTop == 0 ||
        blockedElement.offsetWidth == 0 ||
        blockedElement.clientHeight == 0 ||
        blockedElement.clientWidth == 0
    )

    return () => global.document.body.removeChild(blockedElement)
  }, [])

  return hasAdblocker
}

export default useHasAdblocker
