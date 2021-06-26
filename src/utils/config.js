const atob = require('atob');
const bota = require('btoa');
require('dotenv').config({
    path: __dirname + '\\..\\..\\.env'
})


const authenticate = (authToken) => {
    try {
        if (atob(authToken) !== process.env.AUTHENTICATION_TOKEN) {
            throw new Error("Sorry, You're not allowed to access this API");
        } else {
            return true;
        }
    } catch (err) {
        return `${err}`;
    }
};

const middleware = (req, res, next) => {
    const authToken = req.headers.token;
    const authResult = authenticate(authToken);
    if (authResult === true) {
        next()
    } else {
        res.status(501).send(`${authResult}`)
    }
}

module.exports = {
    dbname: process.env.DATABASE_NAME,
    port: process.env.PORT,
    authToken: process.env.AUTHENTICATION_TOKEN,
    authenticate,
    middleware
}