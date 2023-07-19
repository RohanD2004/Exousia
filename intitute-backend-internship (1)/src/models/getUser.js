const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const autoIncrement = require('mongoose-auto-increment');
const getUser = new Schema(
    {
        loginid: {
            type: String,
            
        },
        pass: {
            type: String,
        },

        role: {
            type: String,
        },
        user_Id: {
            type:Number,
            
        },
    },
    { timestamps: { currentTime: () => Date.now() } },
);



const GetUser = mongoose.model('getUser', getUser);
module.exports = GetUser;
