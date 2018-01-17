
const fs = require('fs')
const path = require('path')
const Screenshot = require('..')

const text = `
body {
  margin: 0;
}

.classa {
  color: #FFF;
}

.classa a {
  background-color: #ccc;
}

`
const draw1 = async () => {
  try {
    let screenshot = new Screenshot({
      width: 1200,
      height: 1200,
    })
    await screenshot.drawText(text, 'css')
    await screenshot.writeFile(path.resolve(__dirname, 'css.png'))
    console.log("wrote out the png file to out.png");
  } catch (e) {
    console.log(e)
  }
}

draw1()
