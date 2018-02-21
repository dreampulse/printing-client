import PropTypes from 'prop-types'
import React, {Component, cloneElement} from 'react'
import ReactDOM from 'react-dom'
import {PortalWithState} from 'react-portal'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'
import ColorSquare from './color-square'

import arrowIcon from '../../asset/icon/arrow-down.svg'

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
    disabled: PropTypes.bool
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
        width: selectSize.width
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
    this.props.onChange(value)
  }

  render() {
    const {modifiers = [], classNames, value, placeholder, menu} = this.props
    const {menuStyle} = this.state
    const finalModifiers = [
      ...modifiers,
      {
        selected: Boolean(value),
        constant: !menu,
        disabled: this.props.disabled
      }
    ]

    const renderButton = (portal = {}) => (
      <button
        type="button"
        key="button"
        className={buildClassName('select-field', finalModifiers, classNames)}
        onClick={portal.isOpen ? portal.closePortal : portal.openPortal}
        disabled={!menu || this.props.disabled}
      >
        {Boolean(value) &&
          (value.colorValue || value.colorImage) && (
            <ColorSquare color={value.colorValue} image={value.colorImage} />
          )}
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
                  onClick: v => {
                    closePortal()
                    this.handleMenuClick(v)
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
