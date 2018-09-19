import React from 'react'
import {storiesOf} from '@storybook/react'

import AnnotatedTableCell from '.'

storiesOf('AnnotatedTableCell', module)
  .add('default', () => <AnnotatedTableCell annotation="Annotation">Cell Value</AnnotatedTableCell>)
  .add('strong', () => (
    <AnnotatedTableCell annotation="Annotation" modifers={['strong']}>
      Cell Value
    </AnnotatedTableCell>
  ))
  .add('without annotation', () => <AnnotatedTableCell>Cell Value</AnnotatedTableCell>)
