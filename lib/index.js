const path = require('path')
const fs = require('fs')
const PImage = require('pureimage')
const text = require('./text')
const parse = require('./parse')
const defaultTheme = require('../themes/darcula')

const hackRegular = path.resolve(__dirname, '../fonts/Hack/Hack-Regular.ttf')

let isDefaultFontLoaded = false

PImage.registerFont(hackRegular, 'Hack-Regular').load(function () {
  isDefaultFontLoaded = true
})


class Screenshot {
  constructor({ width, height, theme = defaultTheme }) {
    this._settings = {
      padding: 40,
      lineHeight: 50,
      fontFamily: 'Hack-Regular',
      fontSize: 24,
    }
    this._theme = theme
    this._point = [40, 40]
    if (!!width && !!height) {
      this.drawBg(width, height)
    }
  }

  drawBg(width, height) {
    this._settings.width = width
    this._settings.height = height
    this._img = PImage.make(width, height)
    this._ctx = this._img.getContext('2d')
    this._ctx.fillStyle = this._theme.background
    this._ctx.fillRect(0, 0, width, height)
  }

  measureText(value) {
    if (!this._ctx._settings) this._ctx._settings = {}
    this._ctx._settings.font = {
      family: this._settings.fontFamily,
      size: this._settings.fontSize
    }
    return text.measureText(value, this._settings.fontFamily, this._settings.fontSize)
  }

  getCtx() {
    return this._ctx
  }

  getFont() {
    const { fontSize, fontFamily } = this._settings
    return `${fontSize}pt ${fontFamily}`
  }

  setTheme(theme) {
    this._theme = theme
  }

  drawText(text, lang) {
    this._lang = lang
    const font = this.getFont()
    const ast = parse(text, lang)
    // fs.writeFileSync('dist/output.json', JSON.stringify(ast, 2, 2), 'utf8')
    ast.map(this.drawToken.bind(this))
  }

  drawString(value, color) {
    color = color || this._theme['foreground'] || '#CCC'
    this._ctx.font = this.getFont()
    this._ctx.fillStyle = color

    const regex = /\r\n?|\n/
    while (value.length > 0) {
      const matchBL = value.match(regex)
      if (!!matchBL) {
        const { index } = matchBL
        let current = value.substr(0, index)
        if (current.length > 0) {
          this.fillText(current)
        }
        // 换行
        this._point = [this._settings.padding, this._point[1] + this._settings.lineHeight]
        value = value.substr(index + 1)
      } else {
        this.fillText(value)
        break
      }
    }
  }

  fillText(value) {
    this._ctx.fillText(value, ...this._point)
    // 移动x坐标
    this._point = [this._point[0] + this.measureText(value).width, this._point[1]]
  }

  drawToken(token) {
    if (typeof token === 'string') {
      return this.drawString(token)
    }
    const { type, value } = token
    if (value instanceof Array) {
      return value.map(this.drawToken.bind(this))
    }
    let color = this._theme[type] || '#FFFFFF'

    if (type === 'comment') {
      return this.drawString(value, color)
    }

    if (this._theme[this._lang] && this._theme[this._lang][type]) {
      color = this._theme[this._lang][type]
    }
    this._ctx.font = this.getFont()
    this._ctx.fillStyle = color
    this.fillText(value)
  }

  async writeFile(filepath) {
    await PImage.encodePNGToStream(this._img, fs.createWriteStream(filepath))
  }

  async pipeStream(stream) {
    return PImage.encodePNGToStream(this._img, stream)
  }
}


Screenshot.isDefaultFontLoaded = isDefaultFontLoaded
Screenshot.registerFont = PImage.registerFont
Screenshot.measureText = text.measureText
Screenshot.measureFullText = text.measureFullText

module.exports = Screenshot
