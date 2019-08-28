const headline = <Headline label="Enter delivery address" size="l" />
const buttons = [
  <Button
    key="cancel"
    label="Cancel"
    text
    onClick={() => {
      closeModal()
    }}
  />,
  <Button
    key="confirm"
    label={
      isSameCountry(userLocation, values.shippingAddress) ? 'Confirm' : 'Confirm and change country'
    }
    disabled={isSubmitting || !isValid}
    onClick={() => {
      handleSubmit()
    }}
  />
]
