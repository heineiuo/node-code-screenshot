const measureText = require('./measureText')

const measureFullText = async (fulltext, options = {}) => {
  let padding = options.padding || 40
  let lineHeight = options.lineHeight || 50
  let fontSize = options.fontSize || 24

  let point = [padding, padding]
  let lineWidth = padding * 2
  let width = padding * 2
  let regex = /\r\n?|\n/
  while (fulltext.length > 0) {
    const matchBL = fulltext.match(regex)
    if (!!matchBL) {
      const { index } = matchBL
      let current = fulltext.substr(0, index)
      if (current.length > 0) {
        lineWidth += await measureText(current, fontSize)
        width = Math.max(lineWidth, width)
      }
      // 换行
      lineWidth = 40
      point = [padding, point[1] + lineHeight]
      fulltext = fulltext.substr(index + 1)
    } else {
      lineWidth += await measureText(fulltext, fontSize)
      width = Math.max(lineWidth, width)
      break
    }
  }
 
  let height = point[1] + padding
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

module.exports = measureFullText