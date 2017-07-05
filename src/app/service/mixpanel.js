const mixpanel = global.mixpanel

export const track = (...params) => {
  if (mixpanel && mixpanel.track) mixpanel.track(...params)
}

export const identify = (...params) => {
  if (mixpanel && mixpanel.identify) mixpanel.identify(...params)
}

export const peopleSet = (...params) => {
  if (mixpanel && mixpanel.people && mixpanel.people.set) mixpanel.people.set(...params)
}
