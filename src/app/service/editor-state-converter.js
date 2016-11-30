import {stateToHTML} from 'draft-js-export-html'
import {EditorState, ContentState, convertFromHTML} from 'draft-js'

export const editorStateToHtml = (editorState) =>
  stateToHTML(editorState.getCurrentContent())

export const editorStateFromHtml = (html) =>
  EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(html)))
