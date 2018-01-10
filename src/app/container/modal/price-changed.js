import React from 'react'

import Overlay from '../../component/overlay'
import Headline from '../../component/headline'
import RichText from '../../component/rich-text'
import Button from '../../component/button'

import {goToCart} from '../../action/navigation'

import {connectLegacy} from '../util/connect-legacy'

const PriceChangedModal = ({onClose}) => {
  const headline = <Headline label="Prices have changed" modifiers={['l', 'warning']} />
  const buttons = [<Button label="OK" onClick={() => onClose()} />]

  return (
    <Overlay headline={headline} buttons={buttons} closePortal={() => onClose()}>
      <RichText>
        <p>
          You have selected your model based on estimated prices, we now have the final price
          available.
        </p>
        <p>
          By clicking “ok” you will be directed to the order summary where we will have the final
          price ready for you.
        </p>
      </RichText>
    </Overlay>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  onClose: goToCart
}

export default connectLegacy(mapStateToProps, mapDispatchToProps)(PriceChangedModal)
