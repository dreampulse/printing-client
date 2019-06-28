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

const CartModelItem = ({
  classNames,
  imageSource,
  title,
  price,
  info,
  buttonsLeft,
  buttonsRight,
  providerImage,
  shippingInfo,
  selected = false,
  onSelect,
  s = false
}) => (
  <div className={cn('CartModelItem', {selected, s, onSelect}, classNames)}>
    <div className="CartModelItem__aside" onClick={onSelect ? () => onSelect(!selected) : noop}>
      <ImageContainer
        modifiers={['ratio-1-1']}
        source={imageSource}
        fallbackSource={fallbackSource}
        alt={`Preview image of ${title}`}
      />
      {onSelect && <CheckboxField checked={selected} onChange={onSelect} />}
    </div>
    <div className="CartModelItem__content">
      <div className="CartModelItem__modelInfo">
        <div className="CartModelItem__contentLeft">
          <strong className="CartModelItem__title">
            <FileName fileName={title} />
          </strong>
          {/* \u00A0 = &nbsp to keep space for info even if empty. */}
          <div className="CartModelItem__info">{info || '\u00A0'}</div>
          {providerImage && <div className="CartModelItem__provider">{providerImage}</div>}
        </div>
        <div className="CartModelItem__contentRight">
          <strong className="CartModelItem__price">{price}</strong>
          {shippingInfo && <div className="CartModelItem__shippingInfo">{shippingInfo}</div>}
        </div>
      </div>
      <div className="CartModelItem__buttons">
        <div className="CartModelItem__buttonsLeft">{buttonsLeft || '\u00A0'}</div>
        <div className="CartModelItem__buttonsRight">{buttonsRight || '\u00A0'}</div>
      </div>
    </div>
  </div>
)

CartModelItem.propTypes = {
  ...propTypes.component,
  // eslint-disable-next-line react/no-unused-prop-types
  id: PropTypes.string.isRequired, // Necessary for ModelList
  imageSource: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string,
  info: PropTypes.node,
  shippingInfo: PropTypes.node,
  providerImage: PropTypes.element,
  buttonsLeft: PropTypes.node,
  buttonsRight: PropTypes.node,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
  s: PropTypes.bool
}

export default CartModelItem