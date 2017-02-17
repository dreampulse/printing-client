import React from 'react'
import {storiesOf} from '@kadira/storybook'

import FormLayout from '../../src/app/component/form-layout'
import FormRow from '../../src/app/component/form-row'

const style = {
  backgroundColor: '#666666'
}
const column = (<div><div style={style}>column</div></div>)

storiesOf('Form Row', module)
  .add('default', () => (
    <FormLayout>
      <FormRow>
        <div>{column}</div>
        <div>{column}</div>
      </FormRow>
    </FormLayout>
  ))
  .add('half-half', () => (
    <FormLayout>
      <FormRow modifiers={['half-half']}>
        <div>{column}</div>
        <div>{column}</div>
      </FormRow>
    </FormLayout>
  ))
  .add('small-large', () => (
    <FormLayout>
      <FormRow modifiers={['small-large']}>
        <div>{column}</div>
        <div>{column}</div>
      </FormRow>
    </FormLayout>
  ))
  .add('large-small', () => (
    <FormLayout>
      <FormRow modifiers={['large-small']}>
        <div>{column}</div>
        <div>{column}</div>
      </FormRow>
    </FormLayout>
  ))
