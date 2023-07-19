const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const autoIncrement = require('mongoose-auto-increment');
const studentSchama = new Schema(
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
        std_id: {
            type: mongoose.Types.ObjectId,
            required: true,
        },

        contact: {
            type: String,
            require: true,
        },

        Alternet_contact: {
            type: String,
            require: true,
        },

        Address: {
            type: String,
            require: true,
        },

        email: {
            type: String,
            require: true,
        },

        username: {
            type: String,
            require: true,
        },

        password: {
            type: String,
            require: true,
        },

        fees: {
            type: mongoose.Types.ObjectId,
            default:"64aaec713e6166d34291cfad",
        },
        feesPaid: {
            type: Number,
            default:'0'
        },
    },
    { timestamps: { currentTime: () => Date.now() } },
);

autoIncrement.initialize(mongoose.connection);
studentSchama.plugin(autoIncrement.plugin, 'student');

// studentSchama.pre('save', async function (next) {
//     try {
//       if (this.isNew) {
//         const saltRounds = 10;
//         const salt = await bcrypt.genSalt(saltRounds);
//         const hashedPassword = await bcrypt.hash(this.password, salt);
//         this.password = hashedPassword;
//       }
//       next();
//     } catch (error) {
//       next(error);
//     }
//   });

const Student = mongoose.model('student', studentSchama);
module.exports = Student;
