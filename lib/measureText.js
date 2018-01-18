const opentype = require('opentype.js')
const path = require('path')
const { promisify } = require('util')

const loadFont = promisify(opentype.load)
const hackRegularPath = path.resolve(__dirname, './fonts/Hack/Hack-Regular.ttf')

const _font = {}

const measureText = async (text, fontSize = 14, options = {}) => {
  if (!_font['Hack-Regular']) {
    _font['Hack-Regular'] = await loadFont(hackRegularPath)
  }
  const font = _font['Hack-Regular']
  if (!font.getAdvanceWidth) {
    throw new Error(`font has no method: [getAdvanceWidth]`)
  }
  const width = font.getAdvanceWidth(text, fontSize, options)
  return width
}

module.exports = measureText

