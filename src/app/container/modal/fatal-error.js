import React from 'react'

import Button from '../../component/button'
import Overlay from '../../component/overlay'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'
import Grid from '../../component/grid'
import Column from '../../component/column'
import Image from '../../component/image'

import {reloadPage} from '../../service/location'

import errorImage from '../../../asset/image/error.svg'

export default ({error}) => {
  const buttons = [<Button label="OK" onClick={() => reloadPage()} />]
  const headline = <Headline label="System error occured" modifiers={['l']} />

  return (
    <Overlay headline={headline} buttons={buttons} closeable={false}>
      <Grid>
        <Column sm={3}>
          <Image src={errorImage} alt="System Error" />
        </Column>
        <Column sm={9}>
          <Paragraph minor>{error.message}</Paragraph>
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
