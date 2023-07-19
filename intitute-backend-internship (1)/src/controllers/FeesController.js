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
        try {
            await feesModule.findOneAndUpdate({ 'std': req.body.std }, req.body);
            Utilities.apiResponse(res, 200, 'fees set successfully');
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