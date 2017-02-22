import React, {Component, PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'
import getGoogleMaps from '../service/get-google-maps'

export default class LocationField extends Component {
  static propTypes = {
    ...propTypes.component,
    googleMapsApiKey: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string
  }

  static defaultProps = {
    onChange: () => {},
    modifiers: []
  }

  state = {
    autocompleteReady: null
  }

  componentDidMount () {
    getGoogleMaps(this.props.googleMapsApiKey).then((googleMaps) => {
      this.initAutocomplete(googleMaps)
    })
  }

  getValue = () => {
    const value = this.props.value
    if (typeof value === 'object') {
      return value.formatted__address
    }

    return value
  }

  initAutocomplete = (googleMaps) => {
    this.autocomplete = new googleMaps.places.Autocomplete(this.inputDom, {types: ['geocode']})
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace()
      this.props.onChange(place)
    })
    this.setState({autocompleteReady: true})
  }

  render () {
    const {
      modifiers,
      classNames,
      name,
      placeholder
    } = this.props

    const disabled = !this.state.autocompleteReady || this.props.disabled
    const finalModifiers = [
      ...modifiers,
      {disabled}
    ]

    return (
      <div className={buildClassName('location-field', finalModifiers, classNames)}>
        <input
          name={name}
          className="location-field__input"
          type="text"
          placeholder={placeholder}
          value={this.getValue()}
          disabled={disabled}
          ref={(d) => { this.inputDom = d }}
        />
      </div>
    )
  }
}
