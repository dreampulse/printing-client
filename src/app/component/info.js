import React, {Component} from 'react'
import Portal from 'react-portal'
import ReactDOM from 'react-dom'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Tooltip from './tooltip'

export default class Info extends Component {

  static propTypes = {
    ...propTypes.component
  }

  state = {
    tooltipOpen: false,
    openRight: false
  }

  onInfoClick = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    })
  }

  onTooltipClose = () => {
    this.setState({
      tooltipOpen: false
    })
  }

  onTooltipOpen = () => {
    // eslint-disable-next-line react/no-find-dom-node
    const infoDOM = ReactDOM.findDOMNode(this)
    const infoSize = infoDOM.getBoundingClientRect()
    const tooltipSize = this.tooltipDOM.getBoundingClientRect()

    // Open the tooltip right of the info button if there is enough space
    // else open to the left
    const openRight = (infoSize.right + tooltipSize.width > global.innerWidth)
    let left = infoSize.left + 5 + infoSize.width + global.scrollX
    if (openRight) {
      left = infoSize.left - 5 + global.scrollX
    }

    this.setState({
      style: {
        left,
        top: infoSize.top + infoSize.height / 2
      },
      openRight
    })
  }

  render () {
    const tooltipStyle = {}
    return (
      <button onClick={this.onInfoClick} className={buildClassName('info', this.props.modifiers, this.props.classNames)}>
        <Portal
          closeOnEsc
          closeOnOutsideClick
          isOpened={this.state.tooltipOpen}
          onOpen={this.onTooltipOpen}
          onClose={this.onTooltipClose}
        >
          <div
            ref={(d) => { this.tooltipDOM = d }}
            className="info__tooltip"
            style={this.state.style}
          >
            <Tooltip
              modifiers={[{
                right: this.state.openRight
              }]}
              style={tooltipStyle}
            >
              {this.props.children}
            </Tooltip>
          </div>
        </Portal>
      </button>
    )
  }

}
