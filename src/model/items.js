const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: true,
        unique: [true, "Item already present in the catalog"]
    },
    price: {
        type: Number,
        requried: true,
        min: 0
    }
});

const Item = new mongoose.model('Item', itemSchema);

const getItemByName = async (name) => {
    const record = await Item.findOne({
        name: name
    });
    return record;
};


const getAllItems = async () => {
    const records = await Item.find({});
    return records;
}

const getPriceByName = async (name) => {
    const record = await getItemByName(name);
    if (record !== null) {
        return record.price;
    }
}

module.exports = {
    Item,
    getItemByName,
    getAllItems,
    getPriceByName
};