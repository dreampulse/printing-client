import React from 'react'

import enhanceClassName from '../lib/enhance-class-name'
import Icon from './icon'

const Button = ({label, icon, ...params}) => (
  <button type="button" {...params}>
    {icon ? <Icon source={icon} /> : null}
    {label}
  </button>
)

Button.propTypes = {
  label: React.PropTypes.string,
  icon: React.PropTypes.string
}

export default enhanceClassName('button')(Button)
