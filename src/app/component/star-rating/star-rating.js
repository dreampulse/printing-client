import PropTypes from 'prop-types'
import React from 'react'
import range from 'lodash/range'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import Icon from '../icon'

import starIcon from '../../../asset/icon/star.svg'

const StarRating = ({classNames, modifiers, stars, of = 5}) => (
  <ul
    className={buildClassName('star-rating', modifiers, classNames)}
    aria-label={`${stars} of ${of}`}
  >
    {range(of).map(key => (
      <li key={`star-${key}`} className={key >= stars ? 'star-rating__star-empty' : null}>
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
