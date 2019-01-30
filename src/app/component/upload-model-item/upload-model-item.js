import PropTypes from 'prop-types'
import React from 'react'

import fallbackSource from '../../../asset/image/model-thumbnail-fallback.png'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import ImageContainer from '../image-container'
import CheckboxField from '../checkbox-field'
import FileName from '../file-name'

// Preload fallbackSource as early as possible
const preloadImage = new global.Image()
preloadImage.src = fallbackSource

const UploadModelItem = ({
  classNames,
  imageSource,
  title,
  subline,
  buttonsLeft,
  buttonsRight,
  selected = false,
  onSelect
}) => (
  <div className={cn('UploadModelItem', {selected}, classNames)}>
    <div className="UploadModelItem__aside">
      <ImageContainer
        source={imageSource}
        fallbackSource={fallbackSource}
        alt={`Preview image of ${title}`}
      />
      {onSelect && <CheckboxField checked={selected} onChange={onSelect} />}
    </div>
    <div className="UploadModelItem__content">
      <strong className="UploadModelItem__title">
        <FileName>{title}</FileName>
      </strong>
      {/* \u00A0 = &nbsp to keep space for subline even if empty. */}
      <div className="UploadModelItem__subline">{subline || '\u00A0'}</div>
      <div className="UploadModelItem__buttons">
        <div className="UploadModelItem__buttonsLeft">{buttonsLeft || '\u00A0'}</div>
        <div className="UploadModelItem__buttonsRight">{buttonsRight || '\u00A0'}</div>
      </div>
    </div>
  </div>
)

UploadModelItem.propTypes = {
  ...propTypes.component,
  id: PropTypes.string.isRequired, // Necessary for ModelList
  imageSource: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subline: PropTypes.string,
  buttonsLeft: PropTypes.node,
  buttonsRight: PropTypes.node,
  selected: PropTypes.bool,
  onSelect: PropTypes.func
}

export default UploadModelItem
