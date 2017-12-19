import {connect} from 'react-redux'

export const connectLegacy = (mapStateToProps, ...args) =>
  connect(state => mapStateToProps(state.legacy), ...args)
