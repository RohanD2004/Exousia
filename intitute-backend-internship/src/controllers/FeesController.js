const mongoose = require('mongoose');
const Utilities = require('../Utilities');
const feesModule = require('../models/fees');

class FeesModule {




    async getFeesDetails(req, res) {
        try {


            const feesdata = await feesModule.find({});
            res.status(200).json(feesdata);
            // Utilities.apiResponse(res, 200, 'Get Student Successfully', getstud);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async setFees(req, res) {
        const id = req.body.std_id;
        try {
            await feesModule.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, req.body);
            Utilities.apiResponse(res, 200, 'fees set successfully');
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async setMessage(req, res) {
        
        try {
            const filter = { _id : req.body.std_id};
            const update = { message:req.body.msg };
            await feesModule.updateOne(filter, update);
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