const mongoose = require('mongoose');
const Utilities = require('../Utilities');
const feesDataModule = require('../models/feesdata');
const StudentModule = require('../models/Student');
const twilio = require('twilio');
require('dotenv').config();
const PhoneNumber = require('libphonenumber-js');


class FeesdataModule {

    async AddFees(req, res) {
        try {

            const currentDate = new Date();
            const dateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

            let Totalfeespaid = 0;
            var Existingfeespaid = parseInt(req.body.feesPaid);
            var curreentAmount = parseInt(req.body.Amount)
            Totalfeespaid = Existingfeespaid + curreentAmount;
            console.log(Totalfeespaid);


            let payfees = {
                feesId: req.body.feesId,
                name: req.body.name,
                std: req.body.std,
                contact: req.body.contact,
                Amount: req.body.Amount,
                Date: dateOnly,
            }


            const newfeesDataModule = new feesDataModule(payfees);

            newfeesDataModule.save();
            let updat = {
                fees: newfeesDataModule._id,
                feesPaid: Totalfeespaid,
            }
            await StudentModule.findOneAndUpdate({ _id: req.body.feesId }, updat);
            Utilities.apiResponse(res, 200, 'Fees Added  Successfully!');
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    };

    async getFeesHistory(req, res) {
        let feesId = req.params.id;
        let query = { feesId: Number(feesId) }
        try {
            let doseExit = await feesDataModule.findOne(query);
            console.log("doseExit:--", doseExit);
            if (doseExit != null) {
                const feeshistory = await feesDataModule.aggregate([
                    {
                        $match: query
                    },

                    {
                        $lookup: {
                            from: 'students',
                            localField: 'feesId',
                            foreignField: '_id',
                            as: "studentinfo",
                            pipeline: [
                                {
                                    $lookup: {
                                        from: 'fees',
                                        localField: 'std_id',
                                        foreignField: '_id',
                                        as: "stdfeesinfo",
                                    },
                                },
                            ],
                            as: 'user_groups',
                        },
                    }
                ]);
                Utilities.apiResponse(res, 200, 'Get fees history Successfully', feeshistory);
            } else {
                Utilities.apiResponse(res, 422, 'Student is not registered');

            }

        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    };

    async getReciptdata(req, res) {

        try {

            const feesdata = await feesDataModule.findOne({}).sort({ _id: -1 });
            Utilities.apiResponse(res, 200, 'Get recipt data Successfully', feesdata);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }

    }

    async  sendMessage(req, res) {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioClient = twilio(accountSid, authToken);
    
        try {
            const { message, mobilenumber } = req.body;
    
            // Ensure the mobile number is in E.164 format with the country code (+91 for India)
            const normalizedNumber = `+91${mobilenumber}`;
    
            const twilioResponse = await twilioClient.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: normalizedNumber,
            });
    
            // Save the message details in MongoDB (optional)
            const newMessage = new Message({ mobileNumber: normalizedNumber, message });
            await newMessage.save();
    
            console.log('SMS sent:', twilioResponse.sid);
            res.sendStatus(200);
        } catch (error) {
            console.error('Error sending SMS:', error);
            res.sendStatus(500);
        }
    }

    
}
module.exports = new FeesdataModule();