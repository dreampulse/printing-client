import {useState, useEffect} from 'react'
import debounce from 'lodash/debounce'

import {getBreakpoints} from '../service/breakpoint'

const useBreakpoints = () => {
  const [breakpoints, setBreakpoints] = useState({})

  useEffect(() => {
    const calculateAndSetBreakpoints = () => setBreakpoints(getBreakpoints())

    const onResize = debounce(() => {
      calculateAndSetBreakpoints()
    }, 200)

    global.addEventListener('resize', onResize, false)
    global.addEventListener('orientationchange', onResize, false)

    calculateAndSetBreakpoints()

    return () => {
      onResize.cancel()
      global.removeEventListener('resize', onResize, false)
      global.removeEventListener('orientationchange', onResize, false)
    }
  }, [])

  return breakpoints
}

export default useBreakpoints
