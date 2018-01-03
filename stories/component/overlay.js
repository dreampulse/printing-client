import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Overlay from '../../src/app/component/overlay'
import Headline from '../../src/app/component/headline'
import Button from '../../src/app/component/button'
import Image from '../../src/app/component/image'
import Paragraph from '../../src/app/component/paragraph'
import RichText from '../../src/app/component/rich-text'
import Grid from '../../src/app/component/grid'
import Column from '../../src/app/component/column'
import LabeledLoadingIndicator from '../../src/app/component/labeled-loading-indicator'
import LocationField from '../../src/app/component/location-field'
import FeatureList from '../../src/app/component/feature-list'
import FeatureListItem from '../../src/app/component/feature-list-item'
import StarRating from '../../src/app/component/star-rating'
import Checked from '../../src/app/component/checked'
import SelectField from '../../src/app/component/select-field'
import SelectMenu from '../../src/app/component/select-menu'

import {getCurrencies} from '../../src/app/lib/currency'

import errorImage from '../../src/asset/image/error.svg'
import {googleMapsApiKey} from '../util/data'

import HandleValue from '../util/handle-value'

const headline = <Headline label="Warning Headline" modifiers={['l']} />
const headlineOther = <Headline label="Overlay Headline" modifiers={['l']} />
const buttons = [<Button label="Cancel" modifiers={['text']} />, <Button label="OK" />]

storiesOf('Overlay', module)
  .add('default', () => (
    <Overlay headline={headline} buttons={buttons} closePortal={action('onClose')}>
      <div>Overlay content</div>
    </Overlay>
  ))
  .add('large', () => (
    <Overlay
      modifiers={['l']}
      headline={headlineOther}
      buttons={buttons}
      closePortal={action('onClose')}
    >
      <div>Overlay content</div>
    </Overlay>
  ))
  .add('not closeable', () => (
    <Overlay headline={headlineOther} buttons={buttons} closeable={false}>
      <div>Overlay content</div>
    </Overlay>
  ))
  .add('Prices changed', () => {
    const pricesChangedHeadline = (
      <Headline label="Prices could have changed" modifiers={['l', 'warning']} />
    )
    return (
      <Overlay headline={pricesChangedHeadline} buttons={buttons} closePortal={action('onClose')}>
        <RichText>
          <p>
            We used the location <strong>Munich, Germany</strong> to calculate prices. You have
            entered <strong>New York, USA</strong> as your shipping address.
          </p>
        </RichText>
        <RichText>
          <p>
            Please double check the prices on the order summary or go back to find the best deal for
            your new location.
          </p>
        </RichText>
      </Overlay>
    )
  })
  .add('Fetching new prices', () => {
    const fetchingNewPricesHeadline = (
      <Headline label="Prices could have changed" modifiers={['l', 'warning']} />
    )
    const fetchingNewPricesButtons = [
      <Button label="Cancel" modifiers={['text']} />,
      <Button label="OK" disabled />
    ]
    return (
      <Overlay
        headline={fetchingNewPricesHeadline}
        buttons={fetchingNewPricesButtons}
        closePortal={action('onClose')}
      >
        <LabeledLoadingIndicator>
          Recalculating prices…<br />
          This might take a few minutes
        </LabeledLoadingIndicator>
      </Overlay>
    )
  })
  .add('System error', () => {
    const systemErrorHeadline = <Headline label="System Error" modifiers={['l']} />
    const systemErrorButtons = [<Button label="OK" />]
    return (
      <Overlay
        headline={systemErrorHeadline}
        buttons={systemErrorButtons}
        closePortal={action('onClose')}
      >
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
  })
  .add('Shipping address', () => {
    const currencies = getCurrencies()
    const pricesChangedHeadline = <Headline label="Shipping address" modifiers={['l']} />
    return (
      <Overlay headline={pricesChangedHeadline} buttons={buttons} closePortal={action('onClose')}>
        <Paragraph>We need your address and currency to calculate the shipping prices</Paragraph>
        <Grid>
          <Column sm={9}>
            <HandleValue>
              <LocationField
                placeholder="Set your location"
                googleMapsApiKey={googleMapsApiKey}
                onChange={action('change')}
                classNames={['u-margin-bottom']}
              />
            </HandleValue>
          </Column>
          <Column sm={3}>
            <HandleValue initialValue={{value: 'USD', label: 'USD'}}>
              <SelectField menu={<SelectMenu values={currencies} />} />
            </HandleValue>
          </Column>
        </Grid>
      </Overlay>
    )
  })
  .add('Material detail', () => {
    const materialDetailHeadline = <Headline label="Polyamide" modifiers={['l']} />
    const materialDetailButtons = [<Button label="Close" />]
    const rating = <StarRating stars={3} />
    const checked = <Checked checked />
    const unchecked = <Checked />
    return (
      <Overlay
        modifiers={['l']}
        headline={materialDetailHeadline}
        buttons={materialDetailButtons}
        closePortal={action('onClose')}
      >
        <Grid>
          <Column sm={12} md={8} lg={7}>
            <RichText classNames={['u-margin-bottom-xl']}>
              <p>
                A great all-round material with great money value. Polyamide is extremely versatile.
                It is strong and slightly flexible. It can be used for a wide range of applications.
                Suitable for full functional parts as well as jewelry and many more applications.
                The surface can be polished and dyed. Its available in many colors. Polyamide is
                also known as Nylon. Professionally 3D printed using laser sintering (SLS). When
                thin, its flexible enough for springs, but when thick, its strong enough for full
                functional parts.
              </p>
            </RichText>
            <Grid>
              <Column sm={6}>
                <Headline modifiers={['xs']} label="Printing Method" />
                <Paragraph classNames={['u-margin-bottom-xl']}>
                  EOS Selective Laser Sintering (SLS)
                </Paragraph>
                <FeatureList>
                  <FeatureListItem feature={rating} label="Strength" />
                  <FeatureListItem feature={rating} label="Flexibility" />
                  <FeatureListItem feature={rating} label="Level of detail" />
                  <FeatureListItem feature={rating} label="Design freedom" />
                </FeatureList>
              </Column>
              <Column sm={6}>
                <Headline modifiers={['xs']} label="Material Spec" />
                <Paragraph classNames={['u-margin-bottom-xl']}>EOS PA 2200 (PA 12)</Paragraph>
                <FeatureList>
                  <FeatureListItem feature={unchecked} label="Dishwasher safe" />
                  <FeatureListItem feature={unchecked} label="Edible" />
                  <FeatureListItem feature={checked} label="Vestibulum accumsan" />
                  <FeatureListItem feature={checked} label="Suspendisse eget" />
                </FeatureList>
              </Column>
            </Grid>
          </Column>
          <Column sm={12} md={4} lg={5}>
            <Image src="http://placehold.it/360x270" alt="Polyamide" />
          </Column>
        </Grid>
      </Overlay>
    )
  })
