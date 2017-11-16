export default {
  pollingRetries: 200,
  pollingInverval: 1000,
  pollingDebouncedWait: 2000,
  fetchTimout: 3000,
  imagePollingRetries: 100,
  imagePollingInterval: 1500,
  cloudinaryUrl: '//res.cloudinary.com/all3dp/image/upload',
  cloudinaryDefaultParams: ['q_90', 'f_auto'],
  scrollToOffset: 100, // Height of sticky header in pixels plus spacing
  debouncePriceRequestWait: 1000,
  defaultSelectedMaterial: 'Premium Plastic',
  stripeCheckoutImage: 'asset/image/checkout-logo.png',
  ravenUrl: 'https://ea87ef20371a4316aca7c9f415aad1f9@sentry.io/193367',
  ravenRelease: process.env.SENTRY_RELEASE_VERSION,
  ipApiKey: '0TrLHRAixWyJhe3'
}
