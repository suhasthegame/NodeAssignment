const express = require('express');
const router = express.Router();
const vehicle = require('../model/vehicles');


router.get('/', (req, res, next) => {
    const data = vehicle.getAllAvailableVehicles();
    data.then((response, err) => {
        res.send(response);
    }).catch(err => res.send(err))
})

router.post('/', async (req, res, next) => {
    const data = await vehicle.getVehicleByRegistration(req.body.registration);
    try {
        if (data === null) {
            const newVehicle = new vehicle.Vehicle(req.body);
            newVehicle.save().
            then(() => {
                res.status(201).send(`Successfully addded vehicle to your fleet`);
            }).catch(err => res.send(err))
        }
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;