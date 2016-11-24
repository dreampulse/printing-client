import React, {Component} from 'react';

import buildClassName from '../util/build-class-name';
import Button from './button';

class Upload extends Component {

  state = {
    isUploadInProgress: false,
    progress: null
  };

  componentDidMount() {
    this.refs.fileInputDom.addEventListener('change', this.fileSelected);
  }

  fileSelected = event => {
    const files = event.currentTarget.files;
    if (files.length > 0) {
      this.upload(files[0]);
    }
  };

  upload(file) {
    const {uploadPath, onUploadFinished, onUploadFailed} = this.props;

    this.setState({isUploadInProgress: true});

    const form = new FormData();
    form.append('file', file);
    form.append('unit', 'mm');
    // form.append('unit', this.state.unit);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', event => {
      if (event.lengthComputable) {
        const progress = event.loaded / event.total;

        this.setState({progress});
      }
    });

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          onUploadFinished(xhr.responseText);
        } else {
          onUploadFailed(xhr.responseText);
        }

        this.setState({
          isUploadInProgress: false,
          progress: null
        });
      }
    };

    xhr.open('POST', uploadPath);
    xhr.send(form);
  }

  openFileUploadDialog = () => event => {
    this.refs.fileInputDom.click();
  };

  render() {
    const {classNames, modifiers, accept} = this.props;
    const {isUploadInProgress, progress} = this.props;

    return (
      <div className={buildClassName('upload', modifiers, classNames)}>
        <input type="file" accept={accept} className="upload__file-input" ref="fileInputDom"/>
        <Button label="upload" onClick={this.openFileUploadDialog()}/>
        { isUploadInProgress ? <div>Progress: {progress * 100}%</div> : null }
      </div>
    );
  }
}

export default Upload;
