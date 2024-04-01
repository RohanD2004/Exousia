const mongoose = require('mongoose');
const Utilities = require('../Utilities');
const AdminModule = require('../models/Admin.js');

class AdminController {

    async getAdminData(req, res) {

        try {
            const id = req.params.id;
            const response = await AdminModule.find({ _id: id });
            Utilities.apiResponse(res, 200, 'Admin Data Get Successful', response);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }

    }
    async updateData(req, res) {
        try {
            const id = req.params.id;
        
            const response = await AdminModule.updateOne({ _id: id }, { $set: req.body });
            Utilities.apiResponse(res, 200, 'Admin Data update Successful', response);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async changeyear(req, res) {
        console.log(req.body)
    }
    


};

module.exports = new AdminController();