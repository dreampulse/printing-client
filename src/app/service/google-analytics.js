export const track = action =>
  global.ga && global.ga('send', 'event', 'printing-engine-client', action)
