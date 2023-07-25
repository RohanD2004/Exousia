const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const autoIncrement = require('mongoose-auto-increment');
const AdminData = new Schema(
    {
        name: {
            type: String,

        },
        gen: {
            type: String,
        },

        contact: {
            type: Number,
        },

        emial:{
            type:String,
        },

        address:{
            type:String,
        },

        className:{
            type:String,
        },

        username:{
            type:String,
        },

        password:{
            type:String,
        }

    },
    { timestamps: { currentTime: () => Date.now() } },
);



const   Admin = mongoose.model('admin', AdminData);
module.exports = Admin;
