import React from 'react'
import {storiesOf} from '@storybook/react'

import FormRow from '.'

const column = () => (
  <div
    style={{
      backgroundColor: '#fff'
    }}
  >
    column
  </div>
)

storiesOf('FormRow', module)
  .add('default', () => <FormRow>{column()}</FormRow>)
  .add('layout: half-half', () => (
    <FormRow layout="half-half">
      {column()}
      {column()}
    </FormRow>
  ))
  .add('layout: s-l', () => (
    <FormRow layout="s-l">
      {column()}
      {column()}
    </FormRow>
  ))
  .add('layout: l-s', () => (
    <FormRow layout="l-s">
      {column()}
      {column()}
    </FormRow>
  ))
