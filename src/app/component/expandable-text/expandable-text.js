import PropTypes from 'prop-types'
import React, {useState} from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const ExpandableText = ({classNames, children, moreLabel, length}) => {
  const [open, setOpen] = useState(false)

  const onMoreClick = event => {
    event.preventDefault()
    setOpen(!open)
  }

  const truncate = children.length > length

  return (
    <span className={cn('ExpandableText', {}, classNames)}>
      {!open && truncate ? children.substring(0, length) : children}{' '}
      {!open && truncate && (
        <a href="#" onClick={onMoreClick} className="ExpandableText__more">
          {moreLabel}
        </a>
      )}
    </span>
  )
}

ExpandableText.propTypes = {
  ...propTypes.component,
  children: PropTypes.string.isRequired,
  moreLabel: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired
}

export default ExpandableText
