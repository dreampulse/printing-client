import {identify} from '../service/mixpanel'
import {setUserContext} from '../service/logging'

export const userCreated = userId => {
  identify(userId) // Send user information to Mixpanel
  setUserContext({
    id: userId
  })
}
