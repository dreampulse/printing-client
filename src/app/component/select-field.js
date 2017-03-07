import React, {Component, PropTypes, cloneElement} from 'react'
import ReactDOM from 'react-dom'
import Portal from 'react-portal'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import Icon from 'Component/icon'
import ColorSquare from 'Component/color-square'

import arrowIcon from 'Icon/arrow-down.svg'

export default class SelectField extends Component {
  static propTypes = {
    ...propTypes.component,
    placeholder: PropTypes.string,
    value: PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string // When not provided value will be shown
    }),
    isOpen: PropTypes.bool,
    setOpen: PropTypes.func,
    onChange: PropTypes.func,
    menu: PropTypes.node // When not provided select field will be in constant mode
  }

  state = {
    isOpen: false,
    menuStyle: null
  }

  onMenuOpen = () => {
    // eslint-disable-next-line react/no-find-dom-node
    const selectDOM = ReactDOM.findDOMNode(this)
    const selectSize = selectDOM.getBoundingClientRect()
    const menuSize = this.menuDOM.getBoundingClientRect()

    // Open the menu above the select field if there is not enough space
    // to the bottom
    const openAbove = (selectSize.top + selectSize.height + menuSize.height > global.innerHeight)

    this.setState({
      menuStyle: {
        top: openAbove
          ? (selectSize.top - menuSize.height + global.scrollY)
          : (selectSize.top + selectSize.height + global.scrollY),
        left: selectSize.left + global.scrollX,
        width: selectSize.width
      }
    })
  }

  getLabel = ({value, label}) => (label || value)

  handleSelectClick = (event) => {
    event.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen,
      menuStyle: null
    })
  }

  handleMenuClick = (value) => {
    this.setState({
      isOpen: false,
      menuStyle: null
    })
    this.props.onChange(value)
  }

  handlePortalClose = () => {
    this.setState({
      isOpen: false,
      menuStyle: null
    })
  }

  render () {
    const {
      modifiers = [],
      classNames,
      value,
      placeholder,
      menu
    } = this.props
    const {
      isOpen,
      menuStyle
    } = this.state
    const finalModifiers = [
      ...modifiers,
      {
        selected: Boolean(value),
        constant: !menu
      }
    ]

    return (
      <button
        type="button"
        className={buildClassName('select-field', finalModifiers, classNames)}
        onClick={this.handleSelectClick}
        disabled={!menu}
      >
        {Boolean(value) && (value.colorValue || value.colorImage) && (
          <ColorSquare color={value.colorValue} image={value.colorImage} />
        )}
        <span className="select-field__value">{value ? this.getLabel(value) : placeholder}</span>
        <Icon source={arrowIcon} />

        {Boolean(menu) && (
          <Portal
            closeOnEsc
            closeOnOutsideClick
            isOpened={isOpen}
            onClose={this.handlePortalClose}
            onOpen={this.onMenuOpen}
          >
            <div
              className="select-field__menu"
              ref={(d) => { this.menuDOM = d }}
              style={menuStyle}
            >
              {cloneElement(menu, {
                onClick: this.handleMenuClick,
                selectedValue: value ? value.value : undefined
              })}
            </div>
          </Portal>
        )}
      </button>
    )
  }
}
