const mongoose = require('mongoose');
const Utilities = require('../Utilities');
require('dotenv').config();

class TimeTableModule {

    async getTimeTable(req, res) {
   
      
        try {
            const std_id = req.body.std_id;
            console.log(std_id);
            const timetablecollection = await mongoose.connection.collection("Timetable");
            const cursor = await timetablecollection.find({ std_id: mongoose.Types.ObjectId(std_id) });
            const data = await cursor.toArray();
            Utilities.apiResponse(res, 200, 'Time Table get Successfully', data);


        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    };
    async getTimeTableForTeacher(req,res)
    {
        console.log(req.body);
        try {
            const std_id = req.body
            var ids=[];

            for (let index = 0; index < std_id.length; index++) {
              ids[index]=mongoose.Types.ObjectId(std_id[index])
                
            }

            const timetablecollection = await mongoose.connection.collection("Timetable");
            const cursor = await timetablecollection.find({ std_id:{ $in: ids } });
            const data = await cursor.toArray();
            Utilities.apiResponse(res, 200, 'Time Table get Successfully', data);


        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }
}

module.exports = new TimeTableModule();