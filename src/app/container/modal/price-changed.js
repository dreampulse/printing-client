import React from 'react'
import {connect} from 'react-redux'

import Overlay from 'Component/overlay'
import Headline from 'Component/headline'
import RichText from 'Component/rich-text'
import Button from 'Component/button'

import {goToCart} from 'Action/navigation'

const PriceChangedModal = ({onClose}) => {
  const headline = <Headline label="Prices have changed" modifiers={['l', 'warning']} />
  const buttons = [
    <Button label="OK" onClick={() => onClose()} />
  ]

  return (
    <Overlay headline={headline} buttons={buttons} closePortal={onClose}>
      <RichText>
        <p>
          You have selected your model based on estimated prices,
          we now have the final price available.
        </p>
        <p>
          By clicking “ok” you will be directed to the order summary
          where we will have the final price ready for you.
        </p>
      </RichText>
    </Overlay>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  onClose: goToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceChangedModal)
