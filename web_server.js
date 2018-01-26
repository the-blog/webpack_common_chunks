const express = require('express')
const path = require('path')
const app = express()

const PORT_NUMBER = 5000

app.set('view engine', 'ejs')
app.locals.greetings = "Hello World!"

function file_path_for(file_name) {
  return path.join(__dirname + '/' + file_name)
}

function render_html(response, file_name) {
  return response.sendFile(file_path_for(file_name))
}

function render_ejs(response, file_name) {
  return response.render(file_path_for(file_name))
}

app.get('/', (request, response) => {
  render_ejs(response, 'index.ejs')
})

app.listen(PORT_NUMBER)
console.log("Running at Port " + PORT_NUMBER)
