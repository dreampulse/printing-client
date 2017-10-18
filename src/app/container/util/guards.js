import React, {Component} from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {replace} from 'react-router-redux'

// Higher order component that forwards to '/' if there is no offer selected
export const onlyWithSelectedOffer = compose(
  connect(state => ({
    selectedOffer: state.price.selectedOffer
  }), {
    replaceRoute: replace
  }),
  OtherComponent => class extends Component {
    constructor (props) {
      super()
      const {selectedOffer, replaceRoute} = props

      if (!selectedOffer) {
        replaceRoute('/')
        this.renderOtherComponent = false
      }
    }
    renderOtherComponent = true
    render () {
      return this.renderOtherComponent ? <OtherComponent {...this.props} /> : null
    }
  }
)
