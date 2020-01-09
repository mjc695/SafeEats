const router = require('express').Router()
const { User } = require('../db/models')

router.post('/login', async function (req, res, next) {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!user) {
      console.log('email incorrect')
      res.status(401).send('The user does not exist')
    }
    else if (!user.correctPassword(req.body.password)) {
      console.log('password incorrect')
      res.status(401).send('Wrong username and password combination')
    }
    else {
      req.session.userId = user.id
      res.status(200).send('successful login')
      // req.login(user,err => err? next(err): res.json(user))
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
