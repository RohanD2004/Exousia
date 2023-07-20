const Utilities = require('../Utilities');
const jwt = require('jsonwebtoken')
require('dotenv').config();
class AuthController {
    async login(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return Utilities.apiResponse(
                    res,
                    422,
                    'User Not Registered',
                    [],
                );
            }
            const isMatch = await user.isValidPassword(req.body.password);
            if (!isMatch) {
                return Utilities.apiResponse(
                    res,
                    422,
                    'Email or Password not valid',
                    [],
                );
            }
            delete user._doc.password;
            delete user._doc.__v;
            const accessToken = await Utilities.signAccessToken(user._doc);
            Utilities.apiResponse(res, 200, 'User Loggedin Successfully!', {
                ...user._doc,
                accessToken,
            });
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
    async  Auth(req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
                // Unauthorized - No token provided or incorrect format
                return Utilities.apiResponse(res, 401, "Authorization header missing or invalid");
            }
    
            const token = authorizationHeader.split(" ")[1];
            const verify = jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }
}

module.exports = new AuthController();
