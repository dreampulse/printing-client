import React from 'react'
import {storiesOf} from '@storybook/react'

import FormLayout from '../../src/app/component/form-layout'
import FormRow from '../../src/app/component/form-row'

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
