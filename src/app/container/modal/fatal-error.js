import React from 'react'

import Button from 'Component/button'
import Overlay from 'Component/overlay'
import Headline from 'Component/headline'
import Paragraph from 'Component/paragraph'
import Grid from 'Component/grid'
import Column from 'Component/column'
import Image from 'Component/image'

import {reloadPage} from 'Service/location'

import errorImage from '../../../asset/image/error.svg'

export default ({error}) => {
  const buttons = [<Button label="OK" onClick={() => reloadPage()} />]
  const headline = <Headline label={error.message} modifiers={['l']} />

  return (
    <Overlay headline={headline} buttons={buttons} closeable={false}>
      <Grid>
        <Column sm={3}>
          <Image src={errorImage} alt="System Error" />
        </Column>
        <Column sm={9}>
          <Paragraph>
            An unexpected error occured. Our technicians have been automatically warned and are
            working to fix the problem.
          </Paragraph>
          <Paragraph>Please press OK to reload the app.</Paragraph>
        </Column>
      </Grid>
    </Overlay>
  )
}
