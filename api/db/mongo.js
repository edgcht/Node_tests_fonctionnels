const mongoose = require('mongoose');

const clientOptions = {
    useNewUrlParser   : true,
    dbName            : 'apinode'
};

exports.initClientDbConnection = () => {
    try {
        mongoose.connect(process.env.URL_MONGO, clientOptions)
    } catch (error) {
        console.log(error);
        throw error;
    }
}