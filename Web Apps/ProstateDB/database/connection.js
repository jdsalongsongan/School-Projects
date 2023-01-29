const knex = require('knex');
require('dotenv').config()

const db = knex({
    client: 'pg',
    connection: process.env.DATABASE
})

module.exports = db;