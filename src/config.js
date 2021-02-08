
if (process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

module.exports = {
    mongo: {
        connectionString: process.env.MONGO_CONNECTION_STRING,
    }
}
