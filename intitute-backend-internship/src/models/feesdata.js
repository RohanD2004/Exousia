const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const autoIncrement = require('mongoose-auto-increment');
const feesdata = new Schema(
    {
        feesId: {
            type: Number,

        },
        name: {
            type: String,
        },
        std: {
            type: String,
        },
        contact: {
            type: Number,
        },
        Amount: {
            type: Number,
        },



    },
    { timestamps: { currentTime: () => Date.now() } },
);



const FeesData = mongoose.model('feesdata', feesdata);
module.exports = FeesData;
