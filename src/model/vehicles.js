const mongoose = require('mongoose');
const validator = require('validator');
const {
    Order
} = require('./orders');

const vehicleSchema = new mongoose.Schema({
    registration: {
        type: String,
        requried: true,
        unique: [true, "Vehicle with registration number already exists"],
        validate(value) {
            if (!validator.isAlphanumeric(value)) {
                throw new Error(`Invalid Vehicle Registration Number`);
            }
        }
    },
    city: {
        type: String,
        required: true,
        minLength: 3
    },
    vehicleType: {
        type: String,
        enum: {
            values: ['bike', 'truck'],
            message: '{VALUE} is not supported'
        },
        required: true
    },
    activeOrdersCount: {
        type: Number,
        default: 0,
        validate(value) {
            if (!isInt(value, {
                    gt: -1,
                    lt: 3
                })) {
                throw new Error(`Value should be in the range of 0-2`)
            }
        }
    }
});

const Vehicle = new mongoose.model('Vehicle', vehicleSchema);

const getVehicleByRegistration = async (registration) => {
    const record = await Vehicle.findOne({
        registration: registration
    });
    return record;
}

const getAvailableVehicleByCity = async (city) => {
    const record = await Vehicle.findOne({
        city: city,
        activeOrdersCount: {
            $lt: 2
        }
    })
    return record;
}

const getAllAvailableVehicles = async () => {
    const records = await Vehicle.find({
        activeOrdersCount: {
            $lt: 2
        }
    });
    return records;
}

const updateDeliveryVehicle = async (vehicleId) => {
    const result = await Vehicle.updateOne({
        registration: vehicleId
    }, {
        $inc: {
            activeOrdersCount: 1
        }
    })
}

const decrementDeliveryVehicle = async (vehicleId) => {
    const result = await Vehicle.updateOne({
        registration: vehicleId
    }, {
        $inc: {
            activeOrdersCount: -1
        }
    })
}

module.exports = {
    Vehicle,
    getAllAvailableVehicles,
    getVehicleByRegistration,
    getAvailableVehicleByCity,
    updateDeliveryVehicle,
    decrementDeliveryVehicle
};