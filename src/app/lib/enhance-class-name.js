import {compose, mapProps, setPropTypes, setDisplayName} from 'recompose'

import buildClassName from './build-class-name'
import propTypes from './prop-types'

export default name =>
  compose(
    setDisplayName(name),
    setPropTypes(propTypes.component),
    mapProps(({modifiers, classNames, ...rest}) => ({
      className: buildClassName(name, modifiers, classNames),
      ...rest
    }))
  )
