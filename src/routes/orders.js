const express = require('express');
const router = express.Router();
const config = require('../utils/config');
const Orders = require('../model/orders');
const item = require('../model/items');
const customer = require('../model/customer');
const vehicle = require('../model/vehicles');

router.all('/', config.middleware);

router.get('/', async (req, res, next) => {
    const data = await Orders.getAllOrder();
    res.status(201).send(data);
})

router.post('/', async (req, res, next) => {
    const itemId = await item.getItemByName(req.body.itemId);
    try {
        if (itemId === null) {
            throw new Error(`Sorry, item doesn't exist. Add item using Item API`)
        }
    } catch (err) {
        res.send(`${err}`)
    }
    const price = await item.getPriceByName(req.body.itemId);
    const customerId = await customer.getCustomerByEmail(req.body.customerId);
    try {
        if (customerId === null) {
            res.send('Add the customer using the Customer API');
        } else {
            var customerCity = customerId.city;
        }
    } catch (err) {
        console.log(err)
    }
    const VehicleId = await vehicle.getAvailableVehicleByCity(customerCity);
    try {
        if (VehicleId !== null) {
            var deliveryVehicleId = VehicleId.registration;
        } else {
            res.send(`Sorry, No Delivery Trucks are available at your location.`);
        }
    } catch (err) {
        res.send(err);
    }
    const order = {
        ...req.body,
        itemId: itemId.name,
        price,
        customerId: customerId.email,
        deliveryVehicleId
    }
    vehicle.updateDeliveryVehicle(deliveryVehicleId);
    const newOrder = new Orders.Order(order);
    newOrder.save().
    then(() => {
        res.send(`Order Placed Successfully`);
    }).catch(err => res.send(err));
});

module.exports = router;