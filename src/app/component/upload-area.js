import PropTypes from 'prop-types'
import React, {Component} from 'react'
import uniqueId from 'lodash/uniqueId'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'

import uploadIcon from '../../asset/icon/upload.svg'

export default class UploadArea extends Component {
  static propTypes = {
    ...propTypes.component,
    label: PropTypes.string.isRequired,
    linkLabel: PropTypes.string.isRequired,
    accept: PropTypes.string,
    description: PropTypes.string.isRequired,
    onChange: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {}
  }

  constructor(props) {
    super(props)

    this.state = {
      inputId: `upload-area-input-${uniqueId()}`,
      dragOver: 0
    }
  }

  onDragEnter = () => {
    this.setState({
      dragOver: this.state.dragOver + 1
    })
  }

  onDragLeave = () => {
    this.setState({
      dragOver: this.state.dragOver - 1
    })
  }

  onDragOver = event => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
  }

  onDrop = event => {
    event.preventDefault()
    this.setState({
      dragOver: 0
    })

    this.props.onChange(event.dataTransfer.files)
  }

  onInputChange = event => {
    if (event.target.files.length > 0) this.props.onChange(event.target.files)
  }

  render() {
    const {classNames, modifiers = [], label, linkLabel, accept, description} = this.props
    const {inputId, dragOver} = this.state

    const finalModifiers = [
      ...modifiers,
      {
        drag: dragOver > 0
      }
    ]

    return (
      <label
        className={buildClassName('upload-area', finalModifiers, classNames)}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
        htmlFor={inputId}
      >
        <Icon source={uploadIcon} />
        {label} <span className="upload-area__link">{linkLabel}</span>
        <div className="upload-area__description">{description}</div>
        <input
          id={inputId}
          type="file"
          className="upload-area__input"
          multiple
          accept={accept}
          onChange={this.onInputChange}
        />
      </label>
    )
  }
}
