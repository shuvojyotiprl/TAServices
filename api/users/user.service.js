const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into registration(firstName, lastName, gender, email, password, number, role) 
                values(?,?,?,?,?,?,?)`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
        'USER'
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        else {
          return callBack(null, results);
        }
       
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from registration where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select id,firstName,lastName,gender,email,number from registration where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUsers: callBack => {
    pool.query(
      `select id,firstName,lastName,gender,email,number from registration`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `delete from registration where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateTokenInDb: (data,jsontoken,callBack) => {
    pool.query(
      `update registration set token = ? where id = ?`,
      [
        jsontoken,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results)
        return callBack(null, results);
      }
    );
  },


  findTokenInDb: (data,jsontoken,callBack) => {
    pool.query(
      `select token from registration where token = ? and id = ?`,
      [
        jsontoken,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results)
        return callBack(null, results);
      }
    );
  }
};
