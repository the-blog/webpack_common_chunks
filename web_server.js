const express = require('express')
const path = require('path')
const app = express()

const PORT_NUMBER = 5000

function html_file(file_name) {
  return path.join(__dirname + '/' + file_name)
}

app.get('/', (request, response) => {
  response.sendFile(html_file('index.html'))
})

app.listen(PORT_NUMBER)
console.log("Running at Port " + PORT_NUMBER)
