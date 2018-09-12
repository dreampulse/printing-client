import PropTypes from 'prop-types'
import React, {Component} from 'react'

import buildClassName from '../../lib/build-class-name'
import {getGoogleMaps, geocode} from '../../service/google-maps'
import geolocate from '../../service/navigator-geolocate'

import Icon from '../icon'
import LoadingIndicator from '../loading-indicator'

import locationIcon from '../../../asset/icon/location.svg'

export default class LocationField extends Component {
  static propTypes = {
    modifiers: PropTypes.arrayOf(PropTypes.string),
    classNames: PropTypes.arrayOf(PropTypes.string),
    googleMapsApiKey: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    onChange: () => {},
    modifiers: [],
    value: ''
  }

  state = {
    autocompleteReady: null,
    loading: false
  }

  componentDidMount() {
    getGoogleMaps(this.props.googleMapsApiKey).then(googleMaps => {
      this.googleMaps = googleMaps
      this.initAutocomplete(googleMaps)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value || nextProps.value !== this.state.value) {
      this.setState({value: nextProps.value})
    }
  }

  componentWillUnmount() {
    this.googleMaps = undefined
  }

  onLocationClick = event => {
    event.preventDefault()

    if (this.googleMaps) {
      this.setState({loading: true})
      geolocate()
        .then(position => {
          const {coords: {latitude: lat, longitude: lng, accuracy}} = position
          const coords = {lat, lng}

          // Bias the autocomplete object to the user's geographical location,
          // as supplied by the browser's 'navigator.geolocation' object.
          if (this.autocomplete) {
            const circle = new this.googleMaps.Circle({
              center: coords,
              radius: accuracy
            })
            this.autocomplete.setBounds(circle.getBounds())
          }

          return geocode(this.googleMaps, coords)
        })
        .then(places => {
          // The first place is the one with the highest granularity
          this.setState({
            value: places[0].formatted_address,
            loading: false
          })
          this.props.onChange(places[0])
        })
        .catch(() => {
          this.setState({loading: false})
          // Currently we do not display the error.
          // This happens usually when the user aborts the geolocation process
        })
    }
  }

  onInputChange = event => {
    this.setState({value: event.target.value})
  }

  getValue = () => {
    const value = typeof this.state.value === 'undefined' ? this.props.value : this.state.value
    if (typeof value === 'object') {
      return value.formatted_address
    }

    return value
  }

  initAutocomplete = () => {
    if (!this.googleMaps || !this.inputDom) {
      return
    }

    this.autocomplete = new this.googleMaps.places.Autocomplete(this.inputDom, {
      types: ['geocode'] // https://developers.google.com/places/web-service/autocomplete?#place_types
    })
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace()
      this.setState({value: place.formatted_address})
      this.props.onChange(place)
    })
    this.setState({autocompleteReady: true})
  }

  render() {
    const {modifiers, classNames, name, placeholder} = this.props
    const {loading} = this.state

    const disabled = !this.state.autocompleteReady || this.props.disabled
    const finalModifiers = [...modifiers, {disabled}]
    const supportsGeolocation = 'geolocation' in global.navigator

    return (
      <div className={buildClassName('location-field', finalModifiers, classNames)}>
        <input
          name={name}
          className="location-field__input"
          type="text"
          placeholder={placeholder}
          value={this.getValue()}
          disabled={disabled}
          ref={d => {
            this.inputDom = d
          }}
          onChange={this.onInputChange}
        />
        {supportsGeolocation &&
          !loading && (
            <button type="button" className="location-field__button" onClick={this.onLocationClick}>
              <Icon source={locationIcon} />
            </button>
          )}
        {supportsGeolocation && loading && <LoadingIndicator />}
      </div>
    )
  }
}
