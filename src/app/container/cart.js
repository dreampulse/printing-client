import React from 'react'
import { connect } from 'react-redux'

import Main from '../component/main'
import Headline from '../component/headline'

const Cart = () => {
  return (
    <Main>
      <Headline label='Order summary' modifiers={['xl']} />
    </Main>
  )
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
