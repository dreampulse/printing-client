import React from 'react'
import {storiesOf} from '@kadira/storybook'

import StarRating from 'Component/star-rating'

storiesOf('Star Rating', module)
  .add('default', () => (
    <StarRating stars={3} of={5} />
  ))
