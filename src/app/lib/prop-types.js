import PropTypes from 'prop-types'

// TODO: move to /app folder

export default {
  component: {
    classNames: PropTypes.arrayOf(PropTypes.string),
    modifiers: PropTypes.arrayOf(PropTypes.string)
  }
}
