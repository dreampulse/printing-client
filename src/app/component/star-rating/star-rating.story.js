import React from 'react'
import {storiesOf} from '@storybook/react'

import StarRating from '.'

storiesOf('Star Rating', module).add('default', () => <StarRating stars={3} of={5} />)
