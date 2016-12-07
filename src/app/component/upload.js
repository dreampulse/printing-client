import React, {Component} from 'react'

import buildClassName from '../util/build-class-name'
import Button from './button'

class Upload extends Component {

  state = {
    isUploadInProgress: false,
    progress: null
  };

  static propTypes = {
    onUpload: React.PropTypes.func.isRequired,
    onUploaded: React.PropTypes.func.isRequired,
    label: React.PropTypes.string.isRequired
  };

  componentDidMount () {
    this.refs.fileInputDom.addEventListener('change', this.fileSelected)
  }

  fileSelected = async event => {
    const files = event.currentTarget.files
    if (files.length < 1) return

    const form = new global.FormData()
    form.append('file', files[0])
    form.append('unit', 'mm')  // TODO

    try {
      this.setState({ isUploadInProgress: true, progress: 0 })
      const res = await this.props.onUpload(form, this.onProgressChange)
      this.props.onUploaded(res)
    } finally {
      this.setState({ isUploadInProgress: false, progress: null })
    }
  };

  onProgressChange = progress => {
    this.setState({progress})
  };

  openFileUploadDialog = () => event => {
    this.refs.fileInputDom.click()
  };

  render () {
    const {classNames, modifiers, accept, label} = this.props
    const {isUploadInProgress, progress} = this.state

    const buttonLabel = isUploadInProgress ? `${Math.round(progress * 100)}% uploaded` : label

    return (
      <div className={buildClassName('upload', modifiers, classNames)}>
        <input type='file' accept={accept} className='upload__file-input' ref='fileInputDom' />
        <Button label={buttonLabel} onClick={this.openFileUploadDialog()} disabled={isUploadInProgress} />
      </div>
    )
  }
}

export default Upload
