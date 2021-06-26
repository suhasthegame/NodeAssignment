require('dotenv').config({
    path: __dirname + '\\..\\..\\.env'
})

module.exports = {
    dbname: process.env.DATABASE_NAME,
    port: process.env.PORT,
    authToken: process.env.AUTHENTICATION_TOKEN
}