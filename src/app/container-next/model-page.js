import React from 'react'

import helpIcon from '../../asset/icon/help.svg'
import cartIcon from '../../asset/icon/cart.svg'
// TODO: Use final svg images here!
import feature1Image from '../../asset/image/feature1.png'
import feature2Image from '../../asset/image/feature2.png'
// import feature3Image from '../../../asset/image/feature3.png'

import {formatDimensions} from '../lib/formatter'

import AppLayout from './app-layout'

import NavBar from '../component/nav-bar'
import IconLink from '../component/icon-link'
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

export const ModelPageComponent = ({
  onGoToHome,
  onUpload,
  onDeleteFile,
  onDeleteModel,
  onChangeIndividualQuantity,
  cartCount,
  models
}) => {
  const isUploadCompleted = models.every(model => model.type === 'MODEL')
  const haveModels = models.length > 1
  const numModels = models.length
  const numModelsUploading = models.reduce(
    (sum, model) => (model.type === 'UPLOADING' ? sum + 1 : sum),
    0
  )

  const navBar = () => (
    <NavBar key="navbar" onClickIdentity={onGoToHome}>
      <IconLink
        modifiers={['invert']}
        icon={cartIcon}
        disabled={cartCount < 1}
        cartCount={cartCount}
      />
      <IconLink modifiers={['invert']} icon={helpIcon} />
    </NavBar>
  )

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

  const uploadingItemsSection = () => (
    <Section>
      <Headline
        label={`Uploading (${numModelsUploading}/${numModels})…`}
        modifiers={['l', 'light']}
      />
      <ModelList>
        {models.map(file => {
          if (file.type === 'UPLOADING') {
            return (
              <UploadModelItemLoad
                key={file.id}
                status={file.progress}
                title="Uploading"
                subline={file.fileName}
                onDelete={() => onDeleteFile(file.id)}
              />
            )
          }
          if (file.type === 'ERROR') {
            return (
              <UploadModelItemError
                key={file.id}
                title="Upload failed"
                subline={file.errorMessage}
                onDelete={() => onDeleteFile(file.id)}
              />
            )
          }
          if (file.type === 'MODEL') {
            return (
              <UploadModelItem
                key={file.id}
                id={file.id}
                quantity={file.quantity}
                imageSource={file.thumbnailUrl}
                title={file.fileName}
                onDelete={() => onDeleteFile(file.id)}
                subline={formatDimensions(file.dimensions, file.unit)}
              />
            )
          }

          return null
        })}
      </ModelList>
    </Section>
  )

  const chooseMaterial = () => (
    <Section>
      <Headline label="Choose material" modifiers={['l', 'light']} />
      <ModelList>
        {models.map(model => (
          <UploadModelItem
            key={model.id}
            imageSource={model.thumbnailUrl}
            quantity={model.quantity}
            title={model.fileName}
            onDelete={() => onDeleteModel(model.id)}
            subline={formatDimensions(model.dimensions, model.unit)}
            onQuantityChange={value =>
              onChangeIndividualQuantity({
                quantity: value,
                id: model.id
              })}
          />
        ))}
      </ModelList>
    </Section>
  )

  return (
    <AppLayout header={navBar()}>
      {uploadSection()}
      {haveModels && (isUploadCompleted ? chooseMaterial() : uploadingItemsSection())}
      {!haveModels && promoSection()}
    </AppLayout>
  )
}

// TODO: connect container
export default ModelPageComponent
