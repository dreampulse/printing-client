import React from 'react'
import {storiesOf} from '@storybook/react'

import FormRow from '.'

const style = {
  backgroundColor: '#fff'
}
const column = <div style={style}>column</div>

storiesOf('Form Row', module)
  .add('default', () => (
    <FormRow>
      {column}
      {column}
    </FormRow>
  ))
  .add('half-half', () => (
    <FormRow modifiers={['half-half']}>
      {column}
      {column}
    </FormRow>
  ))
  .add('small-large', () => (
    <FormRow modifiers={['s-l']}>
      {column}
      {column}
    </FormRow>
  ))
  .add('large-small', () => (
    <FormRow modifiers={['l-s']}>
      {column}
      {column}
    </FormRow>
  ))
