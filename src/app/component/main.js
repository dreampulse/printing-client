import React from 'react'

const Main = ({children}) => (
  <main className="main">
    {children}
  </main>
)

Main.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.array
  ])
}

export default Main
