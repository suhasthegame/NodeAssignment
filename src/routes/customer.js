const express = require('express');
const router = express.Router();
const customer = require('../model/customer');
const config = require('../utils/config');

router.all('/', config.middleware);

router.post('/', async (req, res, next) => {
    const data = await customer.getCustomerByEmail(req.body.email)
    if (data === null) {
        const newCustomer = new customer.Customer(req.body);
        newCustomer.save().
        then(() => {
            res.send('Successfully added the new customer');
        }).catch((err) => {
            res.send(err);
        })
    } else {
        res.send(data);
    }
    next()
})


module.exports = router;