const router = require('express').Router()
const { User } = require('../db/models')

module.exports = router;

// fill in with user routes

router.use('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.use('/:id', async (req, res, next) => {
  try {

    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

