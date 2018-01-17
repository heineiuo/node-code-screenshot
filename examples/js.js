
/**
 * this is comment
 */

const fs = require('fs')
const path = require('path')
const Screenshot = require('..')

const draw1 = async () => {
  try {
    let screenshot = new Screenshot({
      width: 1200,
      height: 1200,
    })
    const self = fs.readFileSync(path.resolve(__dirname, './js.js'), 'utf8')
    await screenshot.drawText(self, 'js')
    await screenshot.writeFile(path.resolve(__dirname, 'js.png'))
    console.log("wrote out the png file to out.png");
  } catch (e) {
    console.log(e)
  }
}

draw1()
