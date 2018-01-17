const opentype = require('opentype.js')
const path = require('path')
const { promisify } = require('util')

const loadFont = promisify(opentype.load)

const measureText = async (text, fontSize = 14, options = {}) => {
  const fontPath1 = path.resolve(__dirname, './fonts/Hack/Hack-Regular.ttf')
  const font = await loadFont(fontPath1)
  if (!font.getAdvanceWidth) {
    throw new Error(`font has no method: [getAdvanceWidth]`)
  }
  return font.getAdvanceWidth(text, fontSize, options)
}

module.exports = measureText

