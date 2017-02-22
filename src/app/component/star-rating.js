import React, {PropTypes} from 'react'
import range from 'lodash/range'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'

import starIcon from '../../asset/icon/star.svg'

const StarRating = ({classNames, modifiers, stars, of = 5}) => (
  <span className={buildClassName('star-rating', modifiers, classNames)} aria-label={`${stars} of ${of}`}>
    {
      range(of).map(key => (
        <Icon key={`star-${key}`} classNames={[{'star-rating__star-empty': key >= stars}]} source={starIcon} />
      ))
    }
  </span>
)

StarRating.propTypes = {
  ...propTypes.component,
  stars: PropTypes.number.isRequired,
  of: PropTypes.number
}

export default StarRating
