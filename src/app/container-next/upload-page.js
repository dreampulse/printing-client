import React from 'react'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import unzip from 'lodash/unzip'

// TODO: Use final svg images here!
import feature1Image from '../../asset/image/feature1.png'
import feature2Image from '../../asset/image/feature2.png'
// import feature3Image from '../../../asset/image/feature3.png'

import {formatDimensions} from '../lib/formatter'

import {selectModelsOfModelConfigs, selectModelConfigs} from '../selector/model'

import {uploadFile, updateQuantities, deleteModelConfigs} from '../action-next/model'

import AppLayout from './app-layout'
import ModelListPartial from './model-list-partial'

import ProviderTeaser from '../component/provider-teaser'
import ProviderImage from '../component/provider-image'
import Section from '../component/section'
import SplitLayout from '../component/split-layout'
import Headline from '../component/headline'
import Baloon from '../component/baloon'
import FeatureParagraph from '../component/feature-paragraph'
import Image from '../component/image'
import UploadArea from '../component/upload-area'
import UploadModelItemError from '../component/upload-model-item-error'
import UploadModelItemLoad from '../component/upload-model-item-load'
import UploadModelItem from '../component/upload-model-item'

const UploadPage = ({onUploadFile, onDeleteModelConfigs, onChangeQuantities, modelsWithConfig}) => {
  const numModels = modelsWithConfig.length
  const haveModels = numModels > 0
  const numModelsUploading = modelsWithConfig.reduce(
    (sum, [model, _]) => (model.type === 'UPLOADING' ? sum + 1 : sum),
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
        onChange={onUploadFile}
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
      <ModelListPartial>
        {modelsWithConfig.map(([modelConfig, model]) => {
          if (modelConfig.type === 'UPLOADING') {
            if (model.error) {
              return (
                <UploadModelItemError
                  key={modelConfig.id}
                  title="Upload failed"
                  subline={model.errorMessage}
                  onDelete={() => onDeleteModelConfigs([modelConfig.id])}
                />
              )
            }
            return (
              <UploadModelItemLoad
                key={modelConfig.id}
                status={model.progress}
                title="Uploading"
                subline={model.fileName}
                onDelete={() => onDeleteModelConfigs([modelConfig.id])}
              />
            )
          }
          if (modelConfig.type === 'UPLOADED') {
            return (
              <UploadModelItem
                key={modelConfig.id}
                id={modelConfig.id}
                quantity={model.quantity}
                imageSource={model.thumbnailUrl}
                title={model.fileName}
                subline={formatDimensions(model.dimensions, model.fileUnit)}
              />
            )
          }

          return null
        })}
      </ModelListPartial>
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

const mapStateToProps = state => ({
  modelsWithConfig: unzip([selectModelConfigs(state), selectModelsOfModelConfigs(state)])
})

const mapDispatchToProps = {
  onUploadFile: uploadFile,
  onDeleteModelConfigs: deleteModelConfigs,
  onChangeQuantities: updateQuantities
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(UploadPage)
