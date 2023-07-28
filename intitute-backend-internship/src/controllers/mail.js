require('dotenv').config();
const fast2Sms = require("fast-two-sms");
const Utilities = require('../Utilities');
var unirest = require("unirest");
class Mail {
  async sendMailData(req, res) {
    // try {
    //   const Options = {
    //     authorization: "vDlAkn05Jo8KnytKTux1lGqPT38xmpSfc5zuNw0jLEEb08TatKgV8L6i0li0",
    //     message: "Hello Exousia",
    //     numbers: ['8799821600'],
    //   };

    //   const response = await fast2Sms.sendMessage(Options);

    //   console.log("Fast2SMS API Response:", response); // Log the entire response object

    //   Utilities.apiResponse(res, 200, 'Message sent Successfully', response);
    // } catch (error) {
    //   console.log(error);
    //   Utilities.apiResponse(res, 500, error);
    // }
    var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

    req.query({
      "authorization": "vDlAkn05Jo8KnytKTux1lGqPT38xmpSfc5zuNw0jLEEb08TatKgV8L6i0li0",
      "message": "Exousia Academy",
      "language": "english",
      "route": "q",
      "numbers": "8799821600",
    });

    req.headers({
      "cache-control": "no-cache"
    });


    req.end(function (res) {
      if (res.error) throw new Error(res.error);

      console.log(res.body);
    });
  }
}

module.exports = new Mail();
