import React from 'react'
import {storiesOf} from '@storybook/react'

import Tooltip from '.'
import Button from '../button'

storiesOf('Tooltip', module)
  .add('default', () => (
    <Tooltip content="Tooltip content with larger text can also span multiple lines">
      <Button label="Open tooltip" />
    </Tooltip>
  ))
  .add('with timeout', () => (
    <Tooltip timeout={1000} content="Tooltip content with larger text can also span multiple lines">
      <Button label="Open tooltip" />
    </Tooltip>
  ))
  .add('scrollable test', () => (
    <div style={{margin: '150vh 150vw', display: 'inline-block'}}>
      <Tooltip
        timeout={5000}
        preferredPosition="right"
        content={
          <>
            Tooltip content with larger text <br /> can also span multiple lines
          </>
        }
      >
        <Button label="Open tooltip" />
      </Tooltip>
    </div>
  ))
