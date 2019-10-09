const path = require('path')

module.exports = {
  process(src, filename, _config, _options) {
    if (/asset\/icon\/.*\.svg$/.test(filename)) {
      // Special object format for SVG icons
      return `module.exports = { id: ${JSON.stringify(path.basename(filename))} };`
    }

    return `module.exports = ${JSON.stringify(path.basename(filename))};`
  }
}
