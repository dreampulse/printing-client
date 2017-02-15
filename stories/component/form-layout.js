import React from 'react'
import {storiesOf} from '@kadira/storybook'

import FormLayout from '../../src/app/component/form-layout'
import FormRow from '../../src/app/component/form-row'

const style = {
  backgroundColor: '#666666'
}
const column = (<div><div style={style}>column</div></div>)

storiesOf('Form Layout', module)
  .add('default', () => (
    <FormLayout>
      <FormRow modifiers={['half-half']}>
        <div>{column}</div>
        <div>{column}</div>
      </FormRow>
      <FormRow>
        <div>{column}</div>
      </FormRow>
    </FormLayout>
  ))
