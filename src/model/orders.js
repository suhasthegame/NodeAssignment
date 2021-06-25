const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection("mongodb://localhost:27017/logistics", {
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
});
autoIncrement.initialize(connection);


const orderSchema = new mongoose.Schema({
    itemId: {
        type: String,
        require: true,

    },
    itemPrice: {
        type: Number,
        require: true,
    },
    customerId: {
        type: String,
        require: true,
    },
    deliveryVehicleId: {
        type: String,
        require: true,
    },
    isDelivered: {
        type: Boolean,
        require: true,
        default: false
    }
});

orderSchema.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'OrderID',
    startAt: '0001',
    incrementBy: '1'
})

const Order = new mongoose.model('Order', orderSchema);

const getAllOrder = async () => {
    const records = await Order.find({});
    return records;
}

const getPendingOrders = async () => {
    const records = await Order.find({
        isDelivered: false
    })
    return records;
}

const getOrderByOrderId = async (OrderID) => {
    const record = await Order.findOne({
        OrderID: OrderID
    })
    return record;
}

const completeOrder = async (OrderID) => {
    const result = await Order.updateOne({
        OrderID: OrderID
    }, {
        isDelivered: true
    })
}

module.exports = {
    Order,
    getAllOrder,
    getPendingOrders,
    getOrderByOrderId,
    completeOrder
};