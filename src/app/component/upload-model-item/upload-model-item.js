import PropTypes from 'prop-types'
import React from 'react'
import noop from 'lodash/noop'

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
  onSelect,
  noCache = false,
  onPreviewImageClick = noop,
  s = false
}) => (
  <div className={cn('UploadModelItem', {selected, s}, classNames)}>
    <div className="UploadModelItem__aside">
      <button type="button" className="UploadModelItem__previewImage" onClick={onPreviewImageClick}>
        <ImageContainer
          ratio="1-1"
          source={noCache ? null : imageSource}
          fallbackSource={noCache ? imageSource : fallbackSource}
          alt={`Preview image of ${title}`}
        />
      </button>
      {onSelect && <CheckboxField checked={selected} onChange={onSelect} />}
    </div>
    <div className="UploadModelItem__content">
      <strong className="UploadModelItem__title">
        <FileName fileName={title} />
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
  imageSource: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subline: PropTypes.string,
  buttonsLeft: PropTypes.node,
  buttonsRight: PropTypes.node,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
  noCache: PropTypes.bool,
  s: PropTypes.bool,
  onPreviewImageClick: PropTypes.func
}

export default UploadModelItem
