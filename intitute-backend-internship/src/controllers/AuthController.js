const Utilities = require('../Utilities');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const getUsers = require("../models/getUser")
class AuthController {

    async login(req, res) {
        try {
            const user = await getUsers.findOne({ loginid: req.body.loginid });
            if (!user) {
                return Utilities.apiResponse(
                    res,
                    422,
                    'User Not Registered',
                    [],
                );
            }
            if (user.pass === req.body.pass) {

                const userdata = {
                    _id: user.id,
                    loginid: user.loginid,
                    pass: user.pass,
                    role: user.role,
                    user_id: user.user_Id,
                }
                delete user._doc.pass;
                delete user._doc.__v;
                const accessToken = await Utilities.signAccessToken(user._doc);
                Utilities.apiResponse(res, 200, 'User Loggedin Successfully!', {
                    userdata,
                    accessToken,
                });
            } else if (user.pass != req.body.pass) {
                Utilities.apiResponse(res, 422, 'Invalid password')
            }
            else if (user.loginid != req.body.loginid) {
                Utilities.apiResponse(res, 422, 'Invalid username')
            }
            else if (user.loginid != req.body.loginid && user.pass != req.body.pass) {
                Utilities.apiResponse(res, 422, 'Invalid username and password')
            }

        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async signup(req, res) {
        try {
            const doesExist = await User.findOne({ email: req.body.email });
            if (doesExist) {
                return Utilities.apiResponse(
                    res,
                    422,
                    'Email is already been registered',
                );
            }
            const user = new User(req.body);
            const savedUser = await user.save();
            const data = {
                _id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
            };
            const accessToken = await Utilities.signAccessToken(data);

            Utilities.apiResponse(res, 200, 'User Created Successfully!', {
                ...data,
                accessToken,
            });
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }
    async Auth(req, res, next) {
        // try {
        //     const authorizationHeader = req.headers.authorization;
        //     if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        //         // Unauthorized - No token provided or incorrect format
        //         return Utilities.apiResponse(res, 401, "Authorization header missing or invalid");
        //     }

        //     const token = authorizationHeader.split(" ")[1];
        //     const verify = jwt.verify(token, process.env.JWT_SECRET);
        //     next();
        // } catch (error) {
        //     Utilities.apiResponse(res, 500, error);
        // }
        Utilities.verifyAccessToken(req, res, next);
    }
}

module.exports = new AuthController();
