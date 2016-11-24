import React from 'react';

import propTypes from '../util/prop-types';
import Icon from './icon';
import buildClassName from '../util/build-class-name';

const Button = ({classNames, modifiers, label, icon, ...params}) => (
  <button type="button" className={buildClassName('button', modifiers, classNames)} {...params}>
    {icon ? <Icon source={icon} /> : null}
    {label}
  </button>
);

Button.propTypes = {
  ...propTypes.component,
  label: React.PropTypes.string,
  icon: React.PropTypes.string
};

export default Button;
