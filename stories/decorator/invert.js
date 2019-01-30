import React from 'react'

export default story => (
  <div className="u-invert" style={{width: '100%', minHeight: '100vh'}}>
    {story()}
  </div>
)
