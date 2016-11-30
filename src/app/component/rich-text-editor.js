import React from 'react'

import {Editor, EditorState, RichUtils} from 'draft-js'

import Button from './button'

import propTypes from '../util/prop-types'
import buildClassName from '../util/build-class-name'

const INLINE_TYPES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'}
]

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  // {label: 'H4', style: 'header-four'},
  // {label: 'H5', style: 'header-five'},
  // {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'}
  // {label: 'Code Block', style: 'code-block'}
]

const RichTextEditor = ({
  modifiers,
  classNames,
  onChange,
  editorState = EditorState.createEmpty()
}) => {
  const onToggleInlineStyle = (style) => {
    return event => {
      event.preventDefault()
      onChange(RichUtils.toggleInlineStyle(editorState, style))
    }
  }

  const renderInlineStyleButton = (inlineStyle) => {
    const buttonModifiers =
      [editorState.getCurrentInlineStyle().has(inlineStyle.style) ? 'primary' : 'minor']
    return (
      <Button
        key={inlineStyle.label}
        modifiers={buttonModifiers}
        label={inlineStyle.label}
        onMouseDown={onToggleInlineStyle(inlineStyle.style)}
      />
    )
  }

  const onToggleBlockType = (style) => {
    return event => {
      event.preventDefault()
      onChange(RichUtils.toggleBlockType(editorState, style))
    }
  }

  const renderBlockStyleButton = (blockStyle) => {
    const selection = editorState.getSelection()
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()

    const buttonModifiers =
      [blockType === blockStyle.style ? 'primary' : 'minor']
    return (
      <Button
        key={blockStyle.label}
        modifiers={buttonModifiers}
        label={blockStyle.label}
        onMouseDown={onToggleBlockType(blockStyle.style)}
      />
    )
  }

  return (
    <div className={buildClassName('rich-text-editor', modifiers, classNames)}>
      <div className='rich-text-editor__controls'>
        {INLINE_TYPES.map(inlineStyle => renderInlineStyleButton(inlineStyle))}
        <span className='rich-text-editor__divider' />
        {BLOCK_TYPES.map(blockStyle => renderBlockStyleButton(blockStyle))}
      </div>
      <div className='rich-text-editor__editor'>
        <Editor editorState={editorState} onChange={onChange} spellCheck />
      </div>
    </div>
  )
}

RichTextEditor.propTypes = {
  ...propTypes.component,
  editorState: React.PropTypes.object,
  onChange: React.PropTypes.func
}

export default RichTextEditor
