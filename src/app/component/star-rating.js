import React, {PropTypes} from 'react'
import range from 'lodash/range'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import Icon from 'Component/icon'

import starIcon from 'Icon/star.svg'

const StarRating = ({classNames, modifiers, stars, of = 5}) => (
  <ul className={buildClassName('star-rating', modifiers, classNames)} aria-label={`${stars} of ${of}`}>
    {
      range(of).map(key => (
        <li key={`star-${key}`} className={key >= stars ? 'star-rating__star-empty' : null}><Icon source={starIcon} /></li>
      ))
    }
  </ul>
)

StarRating.propTypes = {
  ...propTypes.component,
  stars: PropTypes.number.isRequired,
  of: PropTypes.number
}

export default StarRating
