const mongoose = require('mongoose');
const Utilities = require('../Utilities');
const AdminModule = require('../models/Admin.js');

class AdminController{

     async getAdminData(req,res){
        console.log(req.params.id)

        try {
            const id = req.params.id;
            const response =  await AdminModule.find({_id: id});
            Utilities.apiResponse(res, 200, 'Admin Data Get Successful',response);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
       
     }

};

module.exports = new AdminController();