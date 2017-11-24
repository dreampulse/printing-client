import init from './init'
import user from './user'

// https://hackernoon.com/redux-flow-type-getting-the-maximum-benefit-from-the-fewest-key-strokes-5c006c54ec87
// https://github.com/facebook/flow/issues/4002
// eslint-disable-next-line no-unused-vars
type _ExtractReturn<B, F: (...args: any[]) => B> = B
type ExtractReturn<F> = _ExtractReturn<*, F>

export type Actions = ExtractReturn<typeof init.init> | ExtractReturn<typeof user.updatedAddress>
