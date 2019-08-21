
import mediaqueryDefinition from '../../sass/mediaqueries.json'

interface IBreakpoints {
  [name: string]: boolean
}

interface IMediaqueryDefinition {
  mediaqueries: {
    [name: string]: string
  }
}

const {mediaqueries} = mediaqueryDefinition as IMediaqueryDefinition

export const getBreakpoints = () : IBreakpoints => {
  const breakpoints = (Object.keys(mediaqueries) as [string]).reduce((acc, breakpoint) => {
    acc[breakpoint] =  window.matchMedia(mediaqueries[breakpoint].replace(/'/g, '')).matches
    return acc
  }, {} as IBreakpoints)
  return breakpoints
}
