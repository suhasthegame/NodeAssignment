const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/logistics", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(() => {
    console.log("Connection to database is successfull")
}).catch((error) => {
    console.log(error);
});