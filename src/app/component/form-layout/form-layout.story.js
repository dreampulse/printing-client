import React from 'react'
import {storiesOf} from '@storybook/react'

import FormLayout from '.'
import FormRow from '../form-row'

const style = {
  backgroundColor: '#fff'
}
const column = <div style={style}>column</div>

storiesOf('Form Layout', module).add('default', () => (
  <FormLayout>
    <FormRow modifiers={['half-half']}>
      {column}
      {column}
    </FormRow>
    <FormRow>{column}</FormRow>
  </FormLayout>
))
