import {connect} from 'react-redux'

export const connectLegacy = (mapStateToProps, ...args) =>
  connect((state, ownProps) => mapStateToProps(state.legacy, ownProps), ...args)
