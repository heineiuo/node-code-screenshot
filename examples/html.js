

const fs = require('fs')
const path = require('path')
const Screenshot = require('..')

const text = `<!DOCTYPE html>
<html>
  <head>
    <meta char="utf8"/>
    <title>title</title>
  </head>
  <body>
    <div id="app">
    </div>
    <style>
    body {
      margin: 0;
      backgroundColor: '#000
    }
    </style>
    <script>
      var a = "hello"
    </script>
  </body>
</html>
`

const draw1 = async () => {
  try {
    let screenshot = new Screenshot({
      width: 1200,
      height: 1200,
    })
    await screenshot.drawText(text, 'html')
    await screenshot.writeFile(path.resolve(__dirname, 'html.png'))
    console.log("wrote out the png file to out.png");
  } catch (e) {
    console.log(e)
  }
}

draw1()
