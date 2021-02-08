const mongoose = require('mongoose')

const config = require('../config')

mongoose.connect(config.mongo.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

process.on('exit', mongoose.connection.close);

module.exports = mongoose;
