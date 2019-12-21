const Sequelize = require('sequelize')

const databaseName = 'safeeats'

const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, {
  dialect: 'postgres',
  logging: false
})

module.exports = db

// to unhook with mocha
if (process.env.NODE_ENV === 'test') {
  after('closed connection', () => db.close());
}
