const db = require('./db')
const path = require('path')
const express = require('express')
const PORT = process.env.PORT || 8080
const volleyball = require('volleyball')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const app = express()

module.exports = app
app.use(volleyball)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// express session middleware

app.use(session({
  secret: 'hi i am a session',
  resave: false,
  saveUninitialized: false
}))

// session logging req.session for development testing
app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

// static file wearing middlware
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/api', require('./api'))
// app.use('/api', function (req, res, next) {
//   if (!req.session.counter) req.session.counter = 0;
//   console.log('counter', ++req.session.counter);
//   next();
// });

app.use('/auth', require('./auth'))

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

