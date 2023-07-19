const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const autoIncrement = require('mongoose-auto-increment');
const teacherSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
            required: true,
         
        },
        gen: {
            type: String,
            required: true,
         
        },
        Asignclass: {
            type: Array,
            required: true,
        },

        Experties: {
            type: String,
            require: true,
        },

        Experience: {
            type: String,
            require: true,
        },

        subjects: {
            type: String,
            require: true,
        },

        ContactNo: {
            type: String,
            require: true,
        },

        Alternateno: {
            type: String,
            require: true,
        },

        Address: {
            type: String,
            require: true,
        },
        Email: {
            type: String,
            require: true,
        },
        Username: {
            type: String,
            require: true,
        },
        Password: {
            type: String,
            require: true,
        },
     


    },
    { timestamps: { currentTime: () => Date.now() } },
);

autoIncrement.initialize(mongoose.connection);
teacherSchema.plugin(autoIncrement.plugin, 'teacher');

// teacherSchema.pre('save', async function (next) {
//     try {
//         if (this.isNew) {
//             const salt = await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(this.password, salt);
//             this.password = hashedPassword;
//         }
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

const Teacher = mongoose.model('teacher', teacherSchema);
module.exports = Teacher;
