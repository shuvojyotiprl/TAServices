const {
  create,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  updateTokenInDb
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const jwt = require("jsonwebtoken");

const logger = require("./../log/logger")


module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {

        logger.info(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
          details: err.sqlMessage
        });
      }

      return res.status(200).json({
        success: 1,
        data: results
      })

    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        logger.info(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
      logger.info('**** Token in Db *****')
      logger.info(results.token)
      logger.info('**** Checking if the token still alive *****')


      if (results.token != null || results.token != undefined) {

        jwt.verify(results.token, process.env.JWT_KEY, (err, decoded) => {
          if (err) {

            logger.info('** Token expired , Creating new Token**')
            // logger.info('body.password == >' + body.password)
            // logger.info('results.password  == >' + results.password)
            const result = compareSync(body.password, results.password);
            if (result) {
              results.password = undefined;
              results.token = undefined;
              const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
                expiresIn: "1h",
              });



              updateTokenInDb(results, jsontoken, (err, result) => {
                if (err) {
                  logger.info(err);
                  return;
                }
                else {
                  //logger.info(result)
                  logger.info('token updated successfully in db');
                }
              })

              return res.json({
                success: 1,
                message: "login successfully",
                token: jsontoken
              });
            } else {
              return res.json({
                success: 0,
                data: "Invalid email or password"
              });
            }
          } else {

            let time_remaining = (decoded.exp - Date.now().toString().slice(0, 10))
            logger.info('Token active for ' + time_remaining)
            if (time_remaining > 0) {
              logger.info('** Token not expired , returining existing token in db**')
              /***
               * If noken not expired let the user use the existing token 
               * return the existing token in the db
               * ***/
              const result = compareSync(body.password, results.password);

              if (result) {
                return res.json({
                  success: 1,
                  message: "login successfully",
                  token: results.token
                })
              }
              else {
                return res.json({
                  success: 0,
                  data: "Invalid email or password"
                })
              }
            }

          }
        })
      }
      else {
        logger.info("****First Time Login ****")
        const result = compareSync(body.password, results.password);
        if (result) {
          results.password = undefined;
          results.token = undefined;
          const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
            expiresIn: "1h",
          });

          /**updating token in Db , when either token does not exist in db or 
           * the token exist in Db is expired**/

          updateTokenInDb(results, jsontoken, (err, result) => {
            if (err) {
              logger.info(err);
              return;
            }
            else {
              //logger.info(result)
              logger.info('token updated successfully in db');
            }
          })

          return res.json({
            success: 1,
            message: "login successfully",
            token: jsontoken
          });
        } else {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        }
      }

    });
  },
  getUserByUserId: (req, res) => {
    //logger.info(req.decoded.result.id)

    if (req.decoded.result.role != 'ADMIN') {
      return res.json({
        success: 0,
        data: req.decoded.result.firstname + 'needs admin privilages to access this resource'
      })
    }


    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        logger.info(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getUsers: (req, res) => {
    // logger.info(req.decoded.result)
    if (req.decoded.result.role != 'ADMIN') {
      return res.json({
        success: 0,
        data: req.decoded.result.firstName + ' needs admin privilages to access this resource'
      })
    }

    getUsers((err, results) => {
      if (err) {
        logger.info(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },

  testUser: (req, res) => {
    // logger.info(req.decoded.result)
   
    return res.json({
      success: 1,
      data: 'success'
    })
  },

  updateUsers: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        logger.info(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        logger.info(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully"
      });
    });
  },

  getMyDetails: (req, res) => {
    //logger.info(req.decoded)
    //logger.info(req.jwt)


    getUserByUserId(req.decoded.result.id, (err, results) => {
      if (err) {
        logger.info(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },


  logout: (req, res) => {
    // expire the existing token and clear the token in db
    //logger.info(req.decoded)
    updateTokenInDb(req.decoded.result, null, (err, result) => {
      logger.info(req.decoded.result.id)
      if (err) {
        logger.info(err);
        return;
      }
      else {
        //logger.info(result)
        logger.info('token deleted from db');
      }
      return res.json({
        success: 1,
        data: 'Logged out successfully'
      });
    })
  }


};
