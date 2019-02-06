import React from 'react'
import {connect} from 'react-redux'

import config from '../../../config'
import {formatLocation} from '../lib/formatter'
import * as modalActions from '../action/modal'

import Link from '../component/link'

const LocationInfoPartial = ({currency, location, openPickLocationModal}) => {
  const currencies = config.currencies
  const selectedCurrencyValue = currencies.find(({value}) => value === currency)

  const locationNameAndCurrency = location
    ? `${formatLocation(location)}, ${selectedCurrencyValue.label}`
    : 'Select location'

  return (
    <div className={['u-align-right'].join(' ')}>
      Your printing and shipping prices depend on your location.{' '}
      <Link
        onClick={() => openPickLocationModal({isCloseable: true})}
        label={locationNameAndCurrency}
      />
    </div>
  )
}
const mapStateToProps = state => ({
  currency: state.core.currency,
  location: state.core.location
})

const mapDispatchToProps = {
  openPickLocationModal: modalActions.openPickLocationModal
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationInfoPartial)
