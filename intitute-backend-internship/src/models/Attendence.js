const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const autoIncrement = require('mongoose-auto-increment');


const Attendence = new Schema(
    {
        stuId: {
            type:Number,
            required: true,

        },
        teacher_id:
        {
            type: Number,
            required: true,
        },
       
        std: {
            type:  mongoose.Types.ObjectId,
            required: true,

        },

        attend:{
            type:Number
        },

        date:{
            type:String
        }

    },
    { timestamps: { currentTime: () => Date.now() } },
);



const Attendence_module = mongoose.model('Attendence', Attendence);
module.exports = Attendence_module;
