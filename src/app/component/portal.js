import React from 'react';
import ReactModal from 'react-modal';

import propTypes from '../util/prop-types';
import buildClassName from '../util/build-class-name';

ReactModal.defaultStyles = {};

const Portal = ({
  classNames,
  modifiers,
  overlayClassNames,
  children,
  ...params
}) => (
  <ReactModal
    className={buildClassName('portal-content', modifiers, classNames)}
    overlayClassName={buildClassName('portal-overlay', modifiers, overlayClassNames)}
    {...params}
  >
    {children}
  </ReactModal>
);

Portal.propTypes = {
  ...propTypes.component,
  overlayClassNames: React.PropTypes.arrayOf(React.PropTypes.string),
  children: React.PropTypes.node.isRequired
};

export default Portal;
