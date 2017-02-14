import React from 'react'

export default story => (
  <div className="u-invert" style={{width: '100%', height: '100%'}}>
    {story()}
  </div>
)
