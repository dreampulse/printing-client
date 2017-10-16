import {compose, lifecycle} from 'recompose'
import {connect} from 'react-redux'
import {replace} from 'react-router-redux'

// Higher order component that forwards to '/' if there is no offer selected
export const onlyWithSelectedOffer = compose(
  connect(state => ({
    selectedOffer: state.price.selectedOffer
  }), {
    replaceRoute: replace
  }),
  lifecycle({
    componentWillMount () {
      const {selectedOffer, replaceRoute} = this.props

      if (!selectedOffer) {
        replaceRoute('/')
      }
    }
  })
)
