import React, {PropTypes} from 'react'

import enhanceClassName from '../lib/enhance-class-name'

const TwoColumnLayout = ({children, ...params}) => (
  <div {...params}>
    {children}
  </div>
)

TwoColumnLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default enhanceClassName('two-column-layout')(TwoColumnLayout)
