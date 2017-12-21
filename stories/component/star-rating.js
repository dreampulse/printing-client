import React from 'react'
import {storiesOf} from '@storybook/react'

import StarRating from '../../src/app/component/star-rating'

storiesOf('Star Rating', module).add('default', () => <StarRating stars={3} of={5} />)
