const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: true
    },
    city: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Customer already exists "]
    }
});

const Customer = new mongoose.model('Customer', customerSchema);

const getCustomerByEmail = async (email) => {
    const record = await Customer.findOne({
        email: email
    });
    return record;
}

module.exports = {
    Customer,
    getCustomerByEmail
};