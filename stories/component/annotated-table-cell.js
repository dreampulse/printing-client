import React from 'react'
import {storiesOf} from '@storybook/react'

import AnnotatedTableCell from '../../src/app/component/annotated-table-cell'

storiesOf('AnnotatedTableCell', module)
  .add('default', () => <AnnotatedTableCell annotation="Annotation">Cell Value</AnnotatedTableCell>)
  .add('without annotation', () => <AnnotatedTableCell>Cell Value</AnnotatedTableCell>)
