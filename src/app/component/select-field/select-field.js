import PropTypes from 'prop-types'
import React, {Component, cloneElement} from 'react'
import ReactDOM from 'react-dom'
import {PortalWithState} from 'react-portal'

import cn from '../../lib/class-names'
import propTypes from '../../prop-types'

import Icon from '../icon'

import arrowIcon from '../../../asset/icon/arrow-down.svg'

export default class SelectField extends Component {
  static propTypes = {
    ...propTypes.component,
    placeholder: PropTypes.string,
    value: PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string // When not provided value will be shown
    }),
    onChange: PropTypes.func,
    menu: PropTypes.node, // When not provided select field will be in constant mode
    disabled: PropTypes.bool,
    name: PropTypes.string,
    compact: PropTypes.bool,
    error: PropTypes.bool,
    warning: PropTypes.bool
  }

  state = {
    menuStyle: null
  }

  onMenuOpen = () => {
    // eslint-disable-next-line react/no-find-dom-node
    const selectDOM = ReactDOM.findDOMNode(this)
    const selectSize = selectDOM.getBoundingClientRect()
    const menuSize = this.menuDOM.getBoundingClientRect()

    // Open the menu above the select field if there is not enough space
    // to the bottom
    const openAbove = selectSize.top + selectSize.height + menuSize.height > global.innerHeight

    this.setState({
      menuStyle: {
        top: openAbove
          ? selectSize.top - menuSize.height + global.scrollY
          : selectSize.top + selectSize.height + global.scrollY,
        left: selectSize.left + global.scrollX,
        minWidth: selectSize.width
      }
    })
  }

  onMenuClose = () => {
    this.setState({
      menuStyle: null
    })
  }

  getLabel = ({value, label}) => label || value

  handleMenuClick = value => {
    this.props.onChange(value, this.props.name)
  }

  render() {
    const {
      classNames,
      value,
      placeholder,
      menu,
      disabled = false,
      compact = false,
      error = false,
      warning = false
    } = this.props
    const {menuStyle} = this.state

    const renderButton = (portal = {}) => (
      <button
        type="button"
        key="button"
        className={cn(
          'select-field',
          {
            compact,
            error,
            disabled,
            warning,
            selected: Boolean(value),
            constant: !menu
          },
          classNames
        )}
        onClick={portal.isOpen ? portal.closePortal : portal.openPortal}
        disabled={!menu || disabled}
      >
        <span className="select-field__value">{value ? this.getLabel(value) : placeholder}</span>
        <Icon source={arrowIcon} />
      </button>
    )

    if (menu) {
      return (
        <PortalWithState
          closeOnEsc
          closeOnOutsideClick
          onClose={this.onMenuClose}
          onOpen={this.onMenuOpen}
        >
          {({openPortal, closePortal, isOpen, portal}) => [
            renderButton({openPortal, closePortal, isOpen}),
            portal(
              <div
                className="select-field__menu"
                key="menu"
                ref={d => {
                  this.menuDOM = d
                }}
                style={menuStyle}
              >
                {cloneElement(menu, {
                  onClick: (v, event) => {
                    closePortal()
                    this.handleMenuClick(v, event)
                  },
                  selectedValue: value ? value.value : undefined
                })}
              </div>
            )
          ]}
        </PortalWithState>
      )
    }

    // Render select field in constant mode without dropdown menu
    return renderButton()
  }
}
