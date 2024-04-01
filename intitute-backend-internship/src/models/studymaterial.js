const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const autoIncrement = require('mongoose-auto-increment');

const studymaterialschema = new Schema(
    {
        sub: {
            type: String,
            required: true,
        },
        
        std: {
            type: mongoose.Types.ObjectId,
            required: true,
        },

        file_url: {
            type: String,
            require: true,
        },

        description: {
            type: String,
            require: true,
        },
        teacher_name:
        {
            type:String,
        },
        file_name:
        {
            type:String,
        }
    },
    { timestamps: { currentTime: () => Date.now() } },
);

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

const studymaterial = mongoose.model('StudyMaterailModel', studymaterialschema);
module.exports = studymaterial;
