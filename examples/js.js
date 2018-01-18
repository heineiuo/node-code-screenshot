
/**
 * this is comment
 */

const fs = require('fs')
const path = require('path')
const Screenshot = require('..')
const measureFullText = require('../lib/measureFullText')

const draw1 = async () => {
  try {
    const self = fs.readFileSync(path.resolve(__dirname, './js.js'), 'utf8')
    let screenshot = new Screenshot(await measureFullText(self))
    await screenshot.drawText(self, 'js')
    await screenshot.writeFile(path.resolve(__dirname, 'js.png'))
    console.log("wrote out the png file to out.png");
  } catch (e) {
    console.log(e)
  }
}

draw1()
