import PropTypes from 'prop-types'
import React, {Component} from 'react'
import uniqueId from 'lodash/uniqueId'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import Icon from 'Component/icon'

import uploadIcon from 'Icon/upload.svg'

export default class UploadArea extends Component {
  static propTypes = {
    ...propTypes.component,
    label: PropTypes.string.isRequired,
    linkLabel: PropTypes.string.isRequired,
    accept: PropTypes.string,
    subLine: PropTypes.string.isRequired,
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
    this.props.onChange(event.target.files)
  }

  render() {
    const {classNames, modifiers = [], label, linkLabel, accept, subLine} = this.props
    const {inputId, dragOver} = this.state

    const finalModifiers = [
      ...modifiers,
      {
        drag: dragOver > 0
      }
    ]

    return (
      <div
        className={buildClassName('upload-area', finalModifiers, classNames)}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        <Icon source={uploadIcon} />
        {label}{' '}
        <label className="upload-area__link" htmlFor={inputId}>
          {linkLabel}
        </label>
        <div className="upload-area__sub-line">{subLine}</div>
        <input
          id={inputId}
          type="file"
          className="upload-area__input"
          multiple
          accept={accept}
          onChange={this.onInputChange}
        />
      </div>
    )
  }
}
