import React from 'react'

import enhanceClassName from '../lib/enhance-class-name'

const LoadingIndicator = ({...params}) => (
  <span {...params} />
)

export default enhanceClassName('loading-indicator')(LoadingIndicator)
