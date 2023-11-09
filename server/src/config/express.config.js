// create express app
const express = require('express')
const cors = require('cors')

const app = express();

// allow all domains
app.use(cors( { origin: '*'}))

// connect to db
require('./db.config.js')


// export
module.exports = app;