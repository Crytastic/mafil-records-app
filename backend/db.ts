const Pool = require('pg').Pool
require('dotenv').config()

export const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'notetakingmeasuringapp'
})

module.exports = pool