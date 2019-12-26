
const mongoose = require('mongoose');

const config = require('../config');

// const models = join(__dirname, 'app/models');

function connect() {
    var options = { keepAlive: 1 };
    mongoose.connect(config.Mongo.URL, options, ()=>{
        console.log("connected to database")
    
    });
    return mongoose.connection;
}

module.exports.connect = connect