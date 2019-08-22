import React from 'react'
import {storiesOf} from '@storybook/react'

import StarRating from '.'

storiesOf('StarRating', module).add('default', () => <StarRating stars={3} of={5} />)
