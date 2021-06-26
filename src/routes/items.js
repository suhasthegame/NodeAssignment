const express = require('express');
const router = express.Router();
const item = require('../model/items');
const config = require('../utils/config')
router.all('/', config.middleware);

router.get('/', async (req, res, next) => {
    const data = await item.getAllItems();
    if (data !== null) {
        res.send(data);
    }
});

router.post('/', async (req, res, next) => {
    const data = await item.getItemByName(req.body.name);
    if (data === null) {
        const newItem = item.Item(req.body);
        newItem.save().then(() => {
            res.send('Success')
        }).catch(err => res.send(err))
    } else {
        res.send(data)
    }
})
module.exports = router;