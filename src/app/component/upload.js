import React, {Component} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

class Upload extends Component {

  static propTypes = {
    onUpload: React.PropTypes.func.isRequired,
    children: React.PropTypes.node.isRequired,
    ...propTypes.component
  };

  componentDidMount () {
    this.fileInputDom.addEventListener('change', this.fileSelected)
  }

  componentWillUnmount () {
    this.fileInputDom.removeEventListener('change', this.fileSelected)
  }

  onProgressChange = (progress) => {
    this.setState({progress})
  };

  openFileUploadDialog = () => {
    this.fileInputDom.click()
  };

  fileSelected = (event) => {
    const files = event.currentTarget.files
    this.props.onUpload(files)
  }

  render () {
    // eslint-disable-next-line no-unused-vars, no-unused-vars-rest/no-unused-vars
    const {classNames, modifiers, onUpload, children, ...rest} = this.props

    return (
      <div
        className={buildClassName('upload', modifiers, classNames)}
        onClick={this.openFileUploadDialog}
      >
        <input
          type="file"
          className="upload__file-input"
          ref={(element) => { this.fileInputDom = element }}
          {...rest}
        />
        {children}
      </div>
    )
  }
}

export default Upload
