const router = require('express').Router()
const { User } = require('../db/models')

// logging in
router.post('/login', async function (req, res, next) {
  try {

    console.log('req.body.password: ', req.body.password)
    console.log('type ofreq.body.password: ', typeof req.body.password)
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    // console.log('IS IT CORRECT?:', user.correctPassword('123'))
    if (!user) {
      console.log('email incorrect')
      res.status(401).send('The user does not exist')
    }
    else if (!user.correctPassword(req.body.password)) {
      console.log('password incorrect')
      res.status(401).send('Wrong username and password combination')
    }
    else {
      // req.session.userId = user.id
      // res.status(200).send('successful login')
      req.login(user, err => err ? next(err) : res.json(user))
    }
  } catch (err) {
    next(err)
  }
})

// logging out
router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

// getting current user data (already in cookies so grabs data)
router.get('/me', (req, res) => {
  res.json(req.user)
})

module.exports = router
