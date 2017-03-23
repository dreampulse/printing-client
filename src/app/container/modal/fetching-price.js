import React from 'react'

import Overlay from 'Component/overlay'
import Headline from 'Component/headline'
import LabeledLoadingIndicator from 'Component/labeled-loading-indicator'

const headline = <Headline label="Check shipping prices" modifiers={['l', 'warning']} />

const FetchingPriceModal = () => (
  <Overlay headline={headline} closeable={false}>
    <LabeledLoadingIndicator>
      Recalculating prices for new shipping address…<br />
      This might take a few seconds
    </LabeledLoadingIndicator>
  </Overlay>
)

export default FetchingPriceModal
