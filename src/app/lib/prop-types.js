import {PropTypes} from 'react'

export default {
  component: {
    classNames: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])),
    modifiers: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]))
  }
}
