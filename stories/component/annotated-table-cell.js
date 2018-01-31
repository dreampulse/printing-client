import React from 'react'
import {storiesOf} from '@storybook/react'

import AnnotatedTableCell from '../../src/app/component/annotated-table-cell'

storiesOf('AnnotatedTableCell', module)
  .add('default', () => <AnnotatedTableCell value="Cell Value" annotation="Annotation" />)
  .add('without annotation', () => <AnnotatedTableCell value="Cell Value" />)
