const express = require('express');
require("./db/conn");
const items = require('./routes/items');
const customers = require('./routes/customer');
const vehicle = require('./routes/vehicles');
const order = require('./routes/orders');
const orderDelivered = require('./routes/order-delivered');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/items', items);
app.use('/customer', customers);
app.use('/vehicle', vehicle);
app.use('/order', order);
app.use('/order-del', orderDelivered);


app.listen(port, () => {
    console.log('Connection is setup at port 3000');
});