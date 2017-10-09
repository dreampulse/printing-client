import React from 'react'
import {storiesOf} from '@storybook/react'

import FormLayout from 'Component/form-layout'
import FormRow from 'Component/form-row'

const style = {
  backgroundColor: '#fff'
}
const column = (<div style={style}>column</div>)

storiesOf('Form Row', module)
  .add('default', () => (
    <FormLayout>
      <FormRow>
        {column}
        {column}
      </FormRow>
    </FormLayout>
  ))
  .add('half-half', () => (
    <FormLayout>
      <FormRow modifiers={['half-half']}>
        {column}
        {column}
      </FormRow>
    </FormLayout>
  ))
  .add('small-large', () => (
    <FormLayout>
      <FormRow modifiers={['s-l']}>
        {column}
        {column}
      </FormRow>
    </FormLayout>
  ))
  .add('large-small', () => (
    <FormLayout>
      <FormRow modifiers={['l-s']}>
        {column}
        {column}
      </FormRow>
    </FormLayout>
  ))
