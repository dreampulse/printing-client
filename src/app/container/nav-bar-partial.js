import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router'
import config from '../../../config'
import uploadIcon from '../../asset/icon/upload.svg'
import intercomIcon from '../../asset/icon/intercom.svg'

import * as selector from '../lib/selector'
import {formatDimensions} from '../lib/formatter'
import {goToUpload, goToCart} from '../action/navigation'
import {openIntercom, isActualIntercomImpl} from '../service/intercom'

import CartNavLink from '../component/cart-nav-link'
import NavLink from '../component/nav-link'
import NavBar from '../component/nav-bar'
import Logo from '../component/logo'
import CartModelItem from '../component/cart-model-item'

const NavBarPartial = ({
  navBarContent,
  cartCount,
  onUploadClick,
  onCartClick,
  helpOnly = false,
  modelsWithConfig
}) => (
  <NavBar
    leftContent={<Logo href={config.landingPageUrl} />}
    rightContent={
      <>
        {navBarContent}
        {!helpOnly && (
          <>
            <Route path="/" exact>
              {({match}) =>
                !match && (
                  <NavLink label="Upload" onClick={() => onUploadClick()} icon={uploadIcon} />
                )
              }
            </Route>
            <CartNavLink
              href="/cart"
              label="Your Cart"
              count={cartCount}
              onClick={event => {
                event.preventDefault()
                onCartClick()
              }}
            >
              {modelsWithConfig.map(({modelConfig, model}) => (
                <CartModelItem
                  id={modelConfig.id}
                  key={modelConfig.id}
                  s
                  imageSource={model.thumbnailUrl}
                  title={model.fileName}
                  info={formatDimensions(model.dimensions, model.fileUnit)}
                />
              ))}
            </CartNavLink>
          </>
        )}
        <NavLink
          label="Need help?"
          icon={intercomIcon}
          onClick={event => {
            event.preventDefault()
            if (isActualIntercomImpl()) {
              openIntercom()
            } else {
              global.document.location.href = config.supportContactUrl
            }
          }}
        />
      </>
    }
  />
)

const mapStateToProps = state => ({
  cartCount: selector.selectCartCount(state),
  modelsWithConfig: selector.selectConfiguredModelInformation(state)
})

const mapDispatchToProps = {
  onUploadClick: goToUpload,
  onCartClick: goToCart
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBarPartial)
