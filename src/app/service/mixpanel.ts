const mixpanel = window.mixpanel

export const track = (...params: any[]) => {
  if (mixpanel && mixpanel.track) mixpanel.track(...params)
}

export const identify = (...params: any[]) => {
  if (mixpanel && mixpanel.identify) mixpanel.identify(...params)
}
