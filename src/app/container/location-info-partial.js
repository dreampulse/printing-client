import React from 'react'
import {connect} from 'react-redux'

import config from '../../../config'
import {formatLocation} from '../lib/formatter'
import * as modalActions from '../action/modal'
import useBreakpoints from '../hook/use-breakpoints'

import Section from '../component/section'
import Link from '../component/link'
import Paragraph from '../component/paragraph'

const LocationInfoPartial = ({currency, location, openPickLocationModal}) => {
  const breakpoints = useBreakpoints()
  const currencies = config.currencies
  const selectedCurrencyValue = currencies.find(({value}) => value === currency)

  const locationNameAndCurrency = location
    ? `${formatLocation(location)}, ${selectedCurrencyValue.label}`
    : 'Select location'

  return (
    <Section>
      <Paragraph minor classNames={[breakpoints.tablet ? 'u-align-right' : 'u-align-center']}>
        Your printing and shipping prices depend on your location.{' '}
        <Link
          onClick={event => {
            event.preventDefault()
            openPickLocationModal({isCloseable: true})
          }}
          label={locationNameAndCurrency}
        />
      </Paragraph>
    </Section>
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
