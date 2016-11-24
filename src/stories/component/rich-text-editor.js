import React, {Component} from 'react';
import {storiesOf, action} from '@kadira/storybook';

import {editorStateToHtml, editorStateFromHtml} from '../../app/service/editor-state-converter';

import RichTextEditor from '../../app/component/rich-text-editor';


class RichTextEditorState extends Component {

  state = {
    editorState: editorStateFromHtml('<p>Hello <strong>Rich Text Editor</strong></p>')
  };

  onChange(editorState) {
    action('onChange')(editorStateToHtml(editorState));
    this.setState({editorState});
  }

  render() {
    return (
      <RichTextEditor
        onChange={editorState => this.onChange(editorState)}
        editorState={this.state.editorState}
      />
    );
  }
}

storiesOf('Rich text editor', module)
  .add('default', () => (
    <RichTextEditorState />
  ))
 ;
