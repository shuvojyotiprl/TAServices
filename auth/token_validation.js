const jwt = require("jsonwebtoken");


const {
  findTokenInDb
} = require("../api/users/user.service");


module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);

      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.json({
            success: 0,
            message: "Invalid Token..."
          });
        } else {
          /***
           * Check in db if the token is null or not present in db , don allow the user req to pass
           * ***/
          findTokenInDb(decoded.result, token, (err, db_response) => {
           
            //console.log(res)

            if (err) {
              console.log(err)
            }

            if (db_response[0] == null  || db_response[0] == undefined) {
              return res.json({
                success: 0,
                message: "Access Denied! Unauthorized User"
              });
            }
            else {
              //console.log(decoded)
              req.decoded = decoded;
              req.jwt = token
              next();
            }

          })


        }
      });
    } else {
      return res.json({
        success: 0,
        message: "Access Denied! Unauthorized User"
      });
    }
  }
};
