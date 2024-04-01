const mongoose = require('mongoose');
const Utilities = require('../Utilities');
const AdminModule = require('../models/Admin.js');
const Mark = require('../models/Marks')
const AttendenceModule = require('../models/Attendence.js')
const feesDataModule = require('../models/feesdata');
// const { exec } = require('child_process');
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
        // const { year } = req.body;

        // await new Promise((resolve, reject) => {
        //     exec(`mongorestore --db ERP${year} dump/ERP`, (error, stdout, stderr) => {
        //       if (error) {
        //         console.error(`Restore failed: ${error.message}`);
        //         reject(error);
        //         return;
        //       }
        //       console.log('Restore completed');
        //             Utilities.apiResponse(res, 200, 'Database created Successful');
        //       resolve();
        //     });
        //   });
        // const collectionName = `mark${year}`;
        // const attendancenew = `attendences${year}`;
        // const fessdatanew = `feesdatas${year}`;



        // try {
        //    const newCollection= await mongoose.connection.createCollection(collectionName);
        //    const attendencecollection= await mongoose.connection.createCollection(attendancenew);
        //    const feeddatacollection= await mongoose.connection.createCollection(fessdatanew);


        //     const documents = await Mark.find({});
        //     const document2= await AttendenceModule.find({});
        //     const document3= await feesDataModule.find({});

        //     await newCollection.insertMany(documents);
        //     await attendencecollection.insertMany(document2);
        //     await feeddatacollection.insertMany(document3);

        //     await Mark.deleteMany({});
        //     await AttendenceModule.deleteMany({});
        //     await feesDataModule.deleteMany({});

        //     Utilities.apiResponse(res, 200, 'Collection created Successful');
        // } catch (error) {
        //     Utilities.apiResponse(res, 500, error);
        // }
    }



};

module.exports = new AdminController();