const Highlight = require('syntax-highlighter')
const xml = require('highlight-xml')
const js = require('highlight-javascript')
const css = require('highlight-css')
const json = require('highlight-json')


const supportLangs = {
  xml,
  html: xml,
  js,
  css,
  json,
}

const parse = (text, lang, plugin) => {
  const hl = new Highlight()

  if (!!plugin) {
    hl.use(plugin)
  } else if (lang in supportLangs) {
    hl.use(supportLangs[lang])
  }

  const ast = hl.parse(text, lang)
  return ast
}

module.exports = parse

