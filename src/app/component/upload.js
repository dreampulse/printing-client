import React, {Component} from 'react';

import buildClassName from '../util/build-class-name';
import Button from './button';

class Upload extends Component {

  state = {
    isUploadInProgress: false,
    progress: null
  };

  static propTypes = {
    onUpload: React.PropTypes.func.isRequired,
    onUploaded: React.PropTypes.func.isRequired
  };

  componentDidMount() {
    this.refs.fileInputDom.addEventListener('change', this.fileSelected);
  }

  fileSelected = event => {
    const files = event.currentTarget.files;
    if (files.length > 0) {
      const form = new FormData();
      form.append('file', files[0]);
      form.append('unit', 'mm');

      this.setState({
        isUploadInProgress: true,
        progress: 0
      });
      this.props.onUpload(form, this.onProgressChange)
        .then(res => {
          this.setState({
            isUploadInProgress: false,
            progress: null
          });

          this.props.onUploaded(res);
        })
        .catch(err => {
          this.setState({
            isUploadInProgress: false,
            progress: null
          });
        })
    }
  };

  onProgressChange = progress => {
    this.setState({progress});
  };

  openFileUploadDialog = () => event => {
    this.refs.fileInputDom.click();
  };

  render() {
    const {classNames, modifiers, accept} = this.props;
    const {isUploadInProgress, progress} = this.state;

    const label = isUploadInProgress ? `${Math.round(progress * 100)}% uploaded` : 'upload'

    return (
      <div className={buildClassName('upload', modifiers, classNames)}>
        <input type="file" accept={accept} className="upload__file-input" ref="fileInputDom"/>
        <Button label={label} onClick={this.openFileUploadDialog()} disabled={isUploadInProgress}/>
      </div>
    );
  }
}

export default Upload;
