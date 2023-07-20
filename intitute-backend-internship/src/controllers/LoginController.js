const mongoose = require('mongoose');
const Utilities = require('../Utilities');
const getUser = require('../models/getUser')
const jwt = require('jsonwebtoken');
require('dotenv').config();

class LoginController {
  async AuthData(req, res) {

    try {
      const User = await getUser.find({ loginid: req.body.username });
      if (User.length > 0) {
        if (User[0].pass === req.body.password) {
          const uid = User[0]._id;

          const token = jwt.sign({ userId: uid }, process.env.JWT_SECRET);

          const userdata = {
            _id: User[0].id,
            loginid: User[0].loginid,
            pass: User[0].pass,
            role: User[0].role,
            user_id: User[0].user_Id,
          }


          return res.status(200).json({ token, userdata, message: 'User Logged in Successfully!' });

        } else {
          return res.status(422).json({ error: 'Email or Password not valid' });
        }
      } else {
        return res.status(422).json({ error: 'User Not Found' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new LoginController();
