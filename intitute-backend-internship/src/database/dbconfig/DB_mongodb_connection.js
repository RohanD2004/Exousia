const mongoose = require('mongoose');
// const ENV = require('./DB_config');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, {
}).then(()=>{
    console.log('Connection Successful');
 }).catch((e)=>{
    console.log(e);
 });
