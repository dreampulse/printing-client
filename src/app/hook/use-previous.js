import {useRef, useEffect} from 'react'

// https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect
const usePrevious = value => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export default usePrevious
