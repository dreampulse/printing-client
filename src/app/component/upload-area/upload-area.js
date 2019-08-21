import PropTypes from 'prop-types'
import React, {Component} from 'react'
import uniqueId from 'lodash/uniqueId'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'

import uploadIcon from '../../../asset/icon/upload.svg'

export default class UploadArea extends Component {
  static propTypes = {
    ...propTypes.component,
    label: PropTypes.string.isRequired,
    linkLabel: PropTypes.string.isRequired,
    accept: PropTypes.string,
    description: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    s: PropTypes.bool,
    l: PropTypes.bool
  }

  static defaultProps = {
    onChange: () => {},
    s: false,
    l: false
  }

  state = {
    inputId: uniqueId('upload-area-input-'),
    dragOver: 0
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
    if (event.target.files.length > 0) {
      this.props.onChange([...event.target.files])
    }
    // Clear file input
    event.target.value = null
  }

  render() {
    const {classNames, label, linkLabel, accept, description, s, l} = this.props
    const {inputId, dragOver} = this.state

    return (
      <label
        className={cn(
          'UploadArea',
          {
            drag: dragOver > 0,
            s,
            l
          },
          classNames
        )}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
        htmlFor={inputId}
      >
        <Icon source={uploadIcon} />
        <div className="UploadArea__label">
          {label} <span className="UploadArea__link">{linkLabel}</span>
        </div>
        <div className="UploadArea__description">{description}</div>
        <input
          id={inputId}
          type="file"
          className="UploadArea__input"
          multiple
          accept={accept}
          onChange={this.onInputChange}
        />
      </label>
    )
  }
}
