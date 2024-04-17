const mongoose = require('mongoose');
const Utilities = require('../Utilities');
const feesModule = require('../models/fees');
const Studentmodel = require('../models/Student');
const fast2Sms = require("fast-two-sms");
var unirest = require("unirest");
class FeesModule {
    async getFeesDetails(req, res) {
        try {
            const feesdata = await feesModule.find({});
            res.status(200).json(feesdata);
            console.log(feesdata);
            // Utilities.apiResponse(res, 200, 'Get Student Successfully', getstud);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async getStdDetails(req, res) {

        try {
            const stddata = await feesModule.find({ _id: { $in: req.body } });
            res.status(200).json(stddata);
            console.log("Standard details " + stddata);
            // Utilities.apiResponse(res, 200, 'Get Student Successfully', getstud);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async setFees(req, res) {
        const id = req.body.std_id;
        try {
            await feesModule.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId(id) },
                req.body,
            );
            Utilities.apiResponse(res, 200, 'fees set successfully');
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async setMessage(req, res) {
        try {
            const filter = { _id: req.body.std_id };
            const update = { $push: { message: req.body.msg } };
            await feesModule.updateOne(filter, update);
            const msg=req.body.msg;

            const data = await Studentmodel.find({ std_id: mongoose.Types.ObjectId(req.body.std_id) });
            for (let index = 0; index < data.length; index++) {
                // console.log(data[index].contact);
                // console.log(data[index].name);
                var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");
                req.query({
                    "authorization": "vDlAkn05Jo8KnytKTux1lGqPT38xmpSfc5zuNw0jLEEb08TatKgV8L6i0li0",
                    "message":msg.toString(),
                    "language": "english",
                    "route": "q",
                    "numbers": data[index].contact.toString(),
                });
                req.headers({
                    "cache-control": "no-cache"
                });
                req.end(function (res) {
                    if (res.error) {
                        throw new Error(res.error);
                    }
                    console.log(res.body);
                });

            }

            Utilities.apiResponse(res, 200, 'Message Send Successful');
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async updateStudent(req, res) {
        try {
            await feesModule.findOneAndUpdate({ _id: req.params.id }, req.body);
            Utilities.apiResponse(res, 200, 'Student updated Successfully');
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }
}
module.exports = new FeesModule();
