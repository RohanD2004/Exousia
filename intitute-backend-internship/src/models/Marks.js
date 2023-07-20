const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const autoIncrement = require('mongoose-auto-increment');


const Marks = new Schema(
    {
        stuId: {
            type:Number,
            required: true,

        },
        testName: {
            type: String,
            required: true,

        },

     

        std: {
            type:  mongoose.Types.ObjectId,
            required: true,

        },

        
        sub: {
            type: String,
            required: true,

        },
        
        score:{
            type:Number,
            required:true
        },

        TotalMark:{
            type:Number,
            required:true
        },

        date: { type: Date, required: true },



    },
    { timestamps: { currentTime: () => Date.now() } },
);



const Mark = mongoose.model('mark', Marks);
module.exports = Mark;
