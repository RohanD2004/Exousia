const mongoose = require('mongoose');
const Mark = require('../models/Marks')
const Utilities = require('../Utilities');


class MarkController {

    async AddMarks(req, res) {
        try {

            let { testName, std, sub, score, TotalMark, date } = req.body;
            let stuId = req.body.stuId;

            const existingMark = await Mark.findOne({
                stuId,
                testName,
                std,
                sub,
                date
            });

            if (existingMark) {
                return Utilities.apiResponse(res, 400, 'Mark already exists');
            }
            else
            {

            std = mongoose.Types.ObjectId(std);
            const newMark = new Mark({
                stuId,
                testName,
                std,
                sub,
                score,
                TotalMark,
                date,
            });
            newMark.save()
            Utilities.apiResponse(res, 200, 'Mark updated Successfully');

        }

        } catch (error) {

            Utilities.apiResponse(res, 500, error);

        }
    };

    async getMarkData(req, res) {
        try {
            const student_id = req.params.id
            const data = await Mark.find({ stuId: student_id })
            Utilities.apiResponse(res, 200, 'getmarks  Successfully', data);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async getAllMarkData(req, res) {

        console.log(req.body);
        try {
            const data = await Mark.find({ std:mongoose.Types.ObjectId(req.body.std),sub:req.body.sub })
            Utilities.apiResponse(res, 200, 'getmarks  Successfully', data);
        } catch (error) {
            // Utilities.apiResponse(res, 500, error);
        }
    }
}

module.exports = new MarkController();