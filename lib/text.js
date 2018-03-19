const text = require('pureimage/src/text')

// ADVANCE
// const opentype = require('opentype.js')
// const path = require('path')
// const { promisify } = require('util')
// const loadFont = promisify(opentype.load)
// const hackRegularPath = path.resolve(__dirname, '../fonts/Hack/Hack-Regular.ttf')

// const _font = {}

// const measureTextAdvance = async (text, fontSize = 14, options = {}) => {
//   if (!_font['Hack-Regular']) {
//     _font['Hack-Regular'] = await loadFont(hackRegularPath)
//   }
//   const font = _font['Hack-Regular']
//   if (!font.getAdvanceWidth) {
//     throw new Error(`font has no method: [getAdvanceWidth]`)
//   }
//   const width = font.getAdvanceWidth(text, fontSize, options)
//   return width
// }



function measureText(t, fontFamily, fontSize) {
  if (!fontFamily) fontFamily = 'Hack-Regular'
  if (!fontSize) fontSize = 24
  return text.measureText({
    _settings: {
      font: {
        family: fontFamily,
        size: fontSize
      }
    }
  }, t)
}

function measureFullText(fulltext, options) {
  if (!options) options = {}
  let padding = options.padding || 40
  let lineHeight = options.lineHeight || 50
  let fontFamily = options.fontFamily || 'Hack-Regular'
  let fontSize = options.fontSize || 24

  let point = [padding, padding]
  let lineWidth = padding
  let width = padding
  let regex = /\r\n?|\n/
  while (fulltext.length > 0) {
    const matchBL = fulltext.match(regex)
    if (!!matchBL) {
      const { index } = matchBL
      let current = fulltext.substr(0, index)
      if (current.length > 0) {
        lineWidth += measureText(current, fontFamily, fontSize).width
        width = Math.max(lineWidth, width)
      }
      // 换行
      lineWidth = 40
      point = [padding, point[1] + lineHeight]
      fulltext = fulltext.substr(index + 1)
    } else {
      lineWidth += measureText(fulltext, fontFamily, fontSize).width
      width = Math.max(lineWidth, width)
      break
    }
  }

  let height = point[1] + padding
  width += padding
  if (options.minWidth && width < options.minWidth) {
    width = options.minWidth
  }
  if (options.minHeight && height < options.minHeight) {
    height = options.minHeight
  }
  if (options.maxWidth && width > options.maxWidth) {
    width = options.maxWidth
  }
  if (options.maxHeight && height > options.maxHeight) {
    height = options.maxHeight
  }

  return {
    width,
    height
  }
}

module.exports.measureText = measureText
module.exports.measureFullText = measureFullText

