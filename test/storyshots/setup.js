/* eslint-disable no-console */
import React from 'react'
import util from 'util'
import registerRequireContextHook from 'babel-plugin-require-context-hook/register'

registerRequireContextHook()

// We need to catch proptype warnings in the tests.

// Keep a reference to the original console methods.
const consoleWarn = console.warn
const consoleError = console.error

function logToError(...args) {
  throw new Error(util.format(...args))
}

beforeEach(() => {
  console.warn = logToError
  console.error = logToError
})

afterEach(() => {
  console.warn = consoleWarn
  console.error = consoleError
})

const mockComponent = componentName =>
  /* eslint-disable-next-line react/prop-types */
  ({children, ...props}) => (
    <mocked originalComponent={componentName} {...props}>
      {children}
    </mocked>
  )

// Mock incompatible external dependencies
jest.mock('react-portal', () => ({
  Portal: mockComponent('Portal')
}))
