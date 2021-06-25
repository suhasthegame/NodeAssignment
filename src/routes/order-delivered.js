const express = require('express');
const router = express.Router();
const orders = require('../model/orders');
const vehicle = require('../model/vehicles');

router.get('/', async (req, res, next) => {
    const records = await orders.getPendingOrders();
    res.send(records);
})

router.patch('/', async (req, res, next) => {
    const record = await orders.getOrderByOrderId(req.body.OrderID);
    try {
        if (record !== null && !record.isDelivered) {
            await vehicle.decrementDeliveryVehicle(record.deliveryVehicleId);
            await orders.completeOrder(record.OrderID);
            res.send(`Success`)
        } else {
            res.send(`Sorry, either Order is completed or Order ID is incorrect`);
        }
    } catch (err) {
        res.send(err)
    }


})

module.exports = router;