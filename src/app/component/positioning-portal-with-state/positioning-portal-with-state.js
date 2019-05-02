import * as React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import omit from 'lodash/omit'

import PositioningPortal from '../positioning-portal'

const renderProps = (element, props) => (typeof element === 'function' ? element(props) : element)

class PositioningPortalWithState extends React.Component {
  static propTypes = {
    // close() close the tooltip.
    // open() open the tooltop.
    // isOpen
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    onClose: PropTypes.func
  }

  static defaultProps = {
    onClose: noop
  }

  state = {
    isOpen: false
  }

  open = () => {
    this.setState({isOpen: true})
  }

  close = () => {
    this.setState({isOpen: false}, this.props.onClose)
  }

  render() {
    const {children, ...restProps} = this.props
    const {isOpen} = this.state

    return (
      <PositioningPortal
        {...omit(restProps, ['onClose'])}
        isOpen={isOpen}
        onShouldClose={this.close}
      >
        {renderProps(children, {
          open: this.open,
          close: this.close,
          isOpen
        })}
      </PositioningPortal>
    )
  }
}

export default PositioningPortalWithState
