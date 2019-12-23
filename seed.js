const db = require('./server/db')
const { User } = require('./server/db/models')

const users = {
  email: 'monmon@email.com',
  password: '123',
  firstName: 'Monferd',
  lastName: 'Collin',
}

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  await User.create(users)

  console.log(`seeded 1 user`)
  console.log('seeded successfully')
}

async function runseed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

runseed()

// exported for test specs
module.exports = seed
