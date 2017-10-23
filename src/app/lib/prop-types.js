import PropTypes from 'prop-types'

export default {
  component: {
    classNames: PropTypes.arrayOf(PropTypes.string),
    modifiers: PropTypes.arrayOf(PropTypes.string)
  }
}
