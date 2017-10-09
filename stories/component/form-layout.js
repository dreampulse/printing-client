import React from 'react'
import {storiesOf} from '@storybook/react'

import FormLayout from 'Component/form-layout'
import FormRow from 'Component/form-row'

const style = {
  backgroundColor: '#fff'
}
const column = (<div style={style}>column</div>)

storiesOf('Form Layout', module)
  .add('default', () => (
    <FormLayout>
      <FormRow modifiers={['half-half']}>
        {column}
        {column}
      </FormRow>
      <FormRow>
        {column}
      </FormRow>
    </FormLayout>
  ))
