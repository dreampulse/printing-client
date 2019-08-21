import PropTypes from 'prop-types'
import React from 'react'
import range from 'lodash/range'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'

import starIcon from '../../../asset/icon/star.svg'

const StarRating = ({classNames, stars, of = 5}) => (
  <ul className={cn('StarRating', {}, classNames)} aria-label={`${stars} of ${of}`}>
    {range(of).map(key => (
      <li key={`star-${key}`} className={key >= stars ? 'StarRating__star-empty' : null}>
        <Icon source={starIcon} />
      </li>
    ))}
  </ul>
)

StarRating.propTypes = {
  ...propTypes.component,
  stars: PropTypes.number.isRequired,
  of: PropTypes.number
}

export default StarRating
