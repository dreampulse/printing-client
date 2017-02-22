import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'

import starIcon from '../../asset/icon/star.svg'
import starEmptyIcon from '../../asset/icon/star-empty.svg'

const StarRating = ({classNames, modifiers, stars, of = 5}) => (
  <span className={buildClassName('star-rating', modifiers, classNames)} aria-label={`${stars} of ${of}`}>
    {
      Array(stars).fill().map(() => (
        <Icon source={starIcon} />
      ))
    }
    {
      Array(of - stars).fill().map(() => (
        <Icon source={starEmptyIcon} />
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
