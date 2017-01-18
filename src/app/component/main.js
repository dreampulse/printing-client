import React from 'react'

const Main = ({children}) => (
  <main className="main">
    {children}
  </main>
)

Main.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default Main
