const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

const PORT_NUMBER = 5000

app.set('view engine', 'ejs')
app.locals.greetings = "Hello World!"
app.use('/bundles', express.static(path.join(__dirname, 'bundles')))

app.locals.webpackChunkPath = function(chunkName) {
  const webpackAssetsFile = 'webpack-assets.json'
  const webpackAssetsFilePath = path.join(__dirname + '/' + webpackAssetsFile)
  const obj = JSON.parse(fs.readFileSync(webpackAssetsFilePath, 'utf8'))
  return obj[chunkName]['js']
}

function viewFilePath(file_name) {
  return path.join(__dirname + '/' + file_name)
}

function renderHtml(response, file_name) {
  return response.sendFile(viewFilePath(file_name))
}

function renderEJS(response, file_name) {
  return response.render(viewFilePath(file_name))
}

app.get('/', (request, response) => {
  renderEJS(response, 'index.ejs')
})

app.listen(PORT_NUMBER)
console.log("Running at Port " + PORT_NUMBER)
