import {PropTypes} from 'react'

export default {
  component: {
    classNames: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    modifiers: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string)
    ])
  }
}
