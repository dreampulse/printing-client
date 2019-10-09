import path from 'path'
import initStoryshots, {renderOnly} from '@storybook/addon-storyshots'

initStoryshots({
  test: renderOnly,
  storyNameRegex: /^((?!.*?no test).)*$/,
  configPath: path.resolve(__dirname, '../../.storybook')
})
