import {lifecycle} from 'recompose'

// Scrolls to top on mount
export const scrollToTop = () =>
  lifecycle({
    componentDidMount() {
      global.scrollTo(0, 0)
    }
  })
