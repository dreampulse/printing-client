import React from 'react'

import App from '../component/app'
import StickyContainer from '../component/sticky-container'
import Container from '../component/container'
import Footer from '../component/footer'
import Link from '../component/link'

export const AppLayoutComponent = ({children, header, configurationHeader = null}) => {
  const footer = (
    <Footer copyline="© 2018 All3DP">
      <Link label="Contact Us" href="mailto:support@all3dp.com" />
      <Link
        label="Terms and conditions"
        target="_blank"
        href="https://all3dp.com/3dp-price-comparison-terms-of-service/"
      />
      <Link label="Imprint" target="_blank" href="https://all3dp.com/terms-of-use/#imprint" />
    </Footer>
  )

  return (
    <App
      header={[
        header,
        Boolean(configurationHeader) && (
          <StickyContainer key="configHeader">{configurationHeader}</StickyContainer>
        )
      ]}
      footer={footer}
    >
      <Container>{children}</Container>
    </App>
  )
}

// TODO: connect container
export default AppLayoutComponent
