import PropTypes from 'prop-types'
import React from 'react'
import noop from 'lodash/noop'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import logoImage from '../../../asset/image/logo.svg'

const Logo = ({classNames, modifiers, onClick = noop}) => (
  <button className={buildClassName('logo', modifiers, classNames)} type="button" onClick={onClick}>
    <img className="logo__image" src={logoImage} alt="All3DP" />
    <strong className="logo__subline">
      3D Printing & Price<br />
      Comparison Service
    </strong>
  </button>
)

Logo.propTypes = {
  ...propTypes.component,
  onClick: PropTypes.func
}

export default Logo
