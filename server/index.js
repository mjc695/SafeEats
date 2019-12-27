const db = require('./db')
const path = require('path')
const express = require('express')
const PORT = process.env.PORT || 8080
const volleyball = require('volleyball')
const app = express()

module.exports = app
app.use(volleyball)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', require('./api'))

// static file wearing middlware
app.use(express.static(path.join(__dirname, '..', 'public')))

// sends html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

const startListening = () => {
  console.log('working')
  app.listen(PORT, () => console.log(`Listening on ${PORT}`))
}

startListening()
db.sync()

