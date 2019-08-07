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

    global.addEventListener('resize', onResize)
    global.addEventListener('orientationchange', onResize)

    calculateAndSetBreakpoints()

    return () => {
      this.onResize.cancel()
      global.removeEventListener('resize', this.onResize)
      global.removeEventListener('orientationchange', this.onResize)
    }
  }, [])

  return breakpoints
}

export default useBreakpoints
