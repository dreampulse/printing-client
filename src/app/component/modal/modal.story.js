import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Modal from '.'
import Headline from '../headline'
import Button from '../button'
import Image from '../image'
import Paragraph from '../paragraph'
import RichText from '../rich-text'
import Grid from '../grid'
import Column from '../column'
import LabeledLoadingIndicator from '../labeled-loading-indicator'
import LocationField from '../location-field'
import FeatureList from '../feature-list'
import FeatureListItem from '../feature-list-item'
import StarRating from '../star-rating'
import Checked from '../checked'
import SelectField from '../select-field'
import SelectMenu from '../select-menu'
import LabeledField from '../labeled-field'
import WarningIcon from '../warning-icon'

import errorImage from '../../../asset/image/error.svg'

import {googleMapsApiKey, currencies, selectMenuValues} from '../../../../stories/util/data'
import HandleValue from '../../../../stories/util/handle-value'

const headline = <Headline label="Warning Headline" size="l" />
const headlineOther = <Headline label="Modal Headline" size="l" />
const buttons = [<Button label="Cancel" text />, <Button label="OK" />]

storiesOf('Modal', module)
  .add('default', () => (
    <Modal headline={headline} buttons={buttons} closePortal={action('onClose')}>
      <div>Modal content</div>
    </Modal>
  ))
  .add('noCloseOnClickOutside', () => (
    <Modal
      headline={headline}
      buttons={buttons}
      closePortal={action('onClose')}
      noCloseOnClickOutside
    >
      <div>Modal content</div>
    </Modal>
  ))
  .add('l', () => (
    <Modal l headline={headlineOther} buttons={buttons} closePortal={action('onClose')}>
      <div>Modal content</div>
    </Modal>
  ))
  .add('not closeable', () => (
    <Modal headline={headlineOther} buttons={buttons} closeable={false}>
      <div>Modal content</div>
    </Modal>
  ))
  .add('prices changed', () => {
    const pricesChangedHeadline = <Headline label="Prices could have changed" size="l" warning />
    return (
      <Modal headline={pricesChangedHeadline} buttons={buttons} closePortal={action('onClose')}>
        <Paragraph>
          We used the location <strong>Munich, Germany</strong> to calculate prices. You have
          entered <strong>New York, USA</strong> as your shipping address.
        </Paragraph>
        <Paragraph>
          Please double check the prices on the order summary or go back to find the best deal for
          your new location.
        </Paragraph>
      </Modal>
    )
  })
  .add('fetching new prices', () => {
    const fetchingNewPricesHeadline = (
      <Headline label="Prices could have changed" size="l" warning />
    )
    const fetchingNewPricesButtons = [
      <Button label="Cancel" text />,
      <Button label="OK" disabled />
    ]
    return (
      <Modal
        headline={fetchingNewPricesHeadline}
        buttons={fetchingNewPricesButtons}
        closePortal={action('onClose')}
      >
        <LabeledLoadingIndicator classNames={['u-margin-bottom']}>
          Recalculating prices…
          <br />
          This might take a few minutes
        </LabeledLoadingIndicator>
      </Modal>
    )
  })
  .add('system error', () => {
    const systemErrorHeadline = <Headline label="System Error" size="l" />
    const systemErrorButtons = [<Button label="OK" />]
    return (
      <Modal
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
      </Modal>
    )
  })
  .add('shipping address', () => {
    const pricesChangedHeadline = <Headline label="Shipping address" size="l" />
    return (
      <Modal headline={pricesChangedHeadline} buttons={buttons} closePortal={action('onClose')}>
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
      </Modal>
    )
  })
  .add('material detail', () => {
    const materialDetailHeadline = <Headline label="Polyamide" size="l" />
    const materialDetailButtons = [<Button label="Close" />]
    const rating = <StarRating stars={3} />
    const checked = <Checked checked />
    const unchecked = <Checked />
    return (
      <Modal
        l
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
                <Headline size="s" label="Printing Method" />
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
                <Headline size="s" label="Material Spec" />
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
      </Modal>
    )
  })
  .add('change country', () => {
    const pricesChangedHeadline = <Headline label="Change country" size="l" />
    return (
      <Modal headline={pricesChangedHeadline} buttons={buttons} closePortal={action('onClose')}>
        <Grid>
          <Column sm={2}>
            <WarningIcon />
          </Column>
          <Column sm={10}>
            <Paragraph l strong classNames={['u-no-margin']}>
              WARNING: Changing country requires starting over with the order configuration
            </Paragraph>
            <Paragraph l minor>
              Material choice and shipping provider are country dependent
            </Paragraph>
          </Column>
        </Grid>
        <LabeledField
          label="Select country:"
          modifiers={['block']}
          classNames={['u-margin-bottom']}
        >
          <HandleValue>
            <SelectField
              placeholder="Placeholder"
              menu={<SelectMenu values={selectMenuValues} />}
            />
          </HandleValue>
        </LabeledField>
      </Modal>
    )
  })
  .add('confirm location', () => {
    const pricesChangedHeadline = <Headline label="Confirm your location" size="l" />
    return (
      <Modal headline={pricesChangedHeadline}>
        <LabeledField
          label="Shipping to:"
          modifiers={['block']}
          classNames={['u-margin-bottom-xxl']}
        >
          <HandleValue>
            <LocationField
              placeholder="Set your location"
              googleMapsApiKey={googleMapsApiKey}
              onChange={action('change')}
            />
          </HandleValue>
        </LabeledField>
        <Paragraph l minor>
          Why do we need to know this? Printing prices and shipping options depend on your location
        </Paragraph>
      </Modal>
    )
  })
  .add('thank you', () => {
    const pricesChangedHeadline = <Headline label="Thank you for using All3DP" size="l" />
    return (
      <Modal headline={pricesChangedHeadline} buttons={buttons} closePortal={action('onClose')}>
        <Grid>
          <Column sm={3}>
            <Image src="http://placehold.it/200x200" alt="Thank you image" />
          </Column>
          <Column sm={9}>
            <Paragraph l>
              By the way: Prices change.. <strong>all! the! time!</strong>
            </Paragraph>
            <Paragraph l>
              Come back to All3DP to get the best offers next time you 3D print.
            </Paragraph>
          </Column>
        </Grid>
      </Modal>
    )
  })
