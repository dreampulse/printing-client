import React, {Component} from 'react'

import propTypes from '../util/prop-types'
import buildClassName from '../util/build-class-name'
import Button from './button'

class Upload extends Component {

  static propTypes = {
    onUpload: React.PropTypes.func.isRequired,
    onUploaded: React.PropTypes.func.isRequired,
    label: React.PropTypes.string.isRequired,
    ...propTypes.component
  };

  state = {
    isUploadInProgress: false,
    progress: null
  }

  componentDidMount () {
    this.fileInputDom.addEventListener('change', this.fileSelected)
  }

  componentWillUnmount () {
    this.fileInputDom.removeEventListener('change', this.fileSelected)
  }

  onProgressChange = (progress) => {
    this.setState({progress})
  };

  openFileUploadDialog = () => () => {
    this.fileInputDom.click()
  };

  fileSelected = async (event) => {
    const files = event.currentTarget.files
    if (files.length < 1) return

    try {
      this.setState({isUploadInProgress: true, progress: 0})
      const res = await this.props.onUpload(files, this.onProgressChange)
      this.props.onUploaded(res)
    } finally {
      this.setState({isUploadInProgress: false, progress: null})
    }
  }

  render () {
    const {classNames, modifiers, accept, label} = this.props
    const {isUploadInProgress, progress} = this.state

    const buttonLabel = isUploadInProgress ? `${Math.round(progress * 100)}% uploaded` : label

    return (
      <div className={buildClassName('upload', modifiers, classNames)}>
        <input
          type="file"
          accept={accept}
          className="upload__file-input"
          ref={(element) => { this.fileInputDom = element }}
        />
        <Button
          label={buttonLabel}
          onClick={this.openFileUploadDialog()}
          disabled={isUploadInProgress}
        />
      </div>
    )
  }
}

export default Upload
