const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const autoIncrement = require('mongoose-auto-increment');
const fees = new Schema(
    {
        std: {
            type: String,

        },
        total_fees: {
            type: Number,
        },
        

    },
    { timestamps: { currentTime: () => Date.now() } },
);



const Fees = mongoose.model('fee', fees);
module.exports = Fees;
