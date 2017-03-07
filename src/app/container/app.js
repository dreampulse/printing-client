import React from 'react'

import Modal from './modal'

const App = ({children}) => (
  <main>
    <Modal />
    {children}
  </main>
)

export default App
