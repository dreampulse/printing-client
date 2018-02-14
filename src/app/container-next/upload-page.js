import React from 'react'

// TODO: Use final svg images here!
import feature1Image from '../../asset/image/feature1.png'
import feature2Image from '../../asset/image/feature2.png'
// import feature3Image from '../../../asset/image/feature3.png'

import {formatDimensions} from '../lib/formatter'

import AppLayoutContainer from './app-layout'

import ProviderTeaser from '../component/provider-teaser'
import ProviderImage from '../component/provider-image'
import Section from '../component/section'
import SplitLayout from '../component/split-layout'
import Headline from '../component/headline'
import Baloon from '../component/baloon'
import FeatureParagraph from '../component/feature-paragraph'
import Image from '../component/image'
import UploadArea from '../component/upload-area'
import ModelList from '../component/model-list'
import UploadModelItemError from '../component/upload-model-item-error'
import UploadModelItemLoad from '../component/upload-model-item-load'
import UploadModelItem from '../component/upload-model-item'

const UploadPage = ({
  AppLayout = AppLayoutContainer,
  onUpload,
  onDeleteModel,
  onChangeIndividualQuantity,
  models
}) => {
  const numModels = models.length
  const haveModels = numModels > 1
  const numModelsUploading = models.reduce(
    (sum, model) => (model.type === 'UPLOADING' ? sum + 1 : sum),
    0
  )
  const isUploadCompleted = numModelsUploading === 0

  // TODO: replace with fragments
  const promoSection = () => (
    <div>
      <Section>
        <Headline
          label="Save up to 70% on industrial 3D printing"
          modifiers={['l', 'light']}
          classNames={['u-margin-bottom-xxl']}
        />
        <SplitLayout
          leftContent={[
            <FeatureParagraph key="feature1" image={<Image src={feature1Image} />}>
              Compare offers from the top providers and order instantly
            </FeatureParagraph>,
            <FeatureParagraph key="feature2" image={<Image src={feature2Image} />}>
              The widest material choice and the fastest delivery
            </FeatureParagraph>
            /*
            <FeatureParagraph key="feature3" image={feature3Image}>
              Split your order accross multiple providers, effortlessly
            </FeatureParagraph>
            */
          ]}
          rightContent={[
            <Baloon key="baloon1">
              Impossible! My favorite printing service is always the cheapest.
            </Baloon>,
            <Baloon key="baloon2" modifiers={['right']}>
              Not Always! Prices vary hugely based on model and material. Here you will always find
              the best deal.
            </Baloon>
          ]}
        />
      </Section>
      <ProviderTeaser>
        <ProviderImage name="shapeways" />
        <ProviderImage name="imaterialise" />
        <ProviderImage name="sculpteo" />
      </ProviderTeaser>
    </div>
  )

  const uploadSection = () => (
    <Section>
      <UploadArea
        label="Drag any 3D files here or"
        linkLabel="select files"
        description="Supported file formats: STL, OBJ, WRL, SKP, DAE, 3DS, IGS, FBX, PLY, X3D, STP, PRT, …"
        accept="*"
        onChange={onUpload}
      />
    </Section>
  )

  const modelListSection = () => (
    <Section>
      <Headline
        label={
          isUploadCompleted ? 'Choose material' : `Uploading (${numModelsUploading}/${numModels})…`
        }
        modifiers={['xl']}
      />
      <ModelList>
        {models.map(model => {
          if (model.type === 'UPLOADING') {
            return (
              <UploadModelItemLoad
                key={model.id}
                status={model.progress}
                title="Uploading"
                subline={model.fileName}
                onDelete={() => onDeleteModel(model.id)}
              />
            )
          }
          if (model.type === 'ERROR') {
            return (
              <UploadModelItemError
                key={model.id}
                title="Upload failed"
                subline={model.errorMessage}
                onDelete={() => onDeleteModel(model.id)}
              />
            )
          }
          if (model.type === 'MODEL') {
            return (
              <UploadModelItem
                key={model.id}
                id={model.id}
                quantity={model.quantity}
                imageSource={model.thumbnailUrl}
                title={model.fileName}
                onDelete={() => onDeleteModel(model.id)}
                subline={formatDimensions(model.dimensions, model.unit)}
                onQuantityChange={value => onChangeIndividualQuantity(model.id, value)}
              />
            )
          }

          return null
        })}
      </ModelList>
    </Section>
  )

  return (
    <AppLayout>
      {uploadSection()}
      {haveModels && modelListSection()}
      {!haveModels && promoSection()}
    </AppLayout>
  )
}

// TODO: connect container
export default UploadPage
