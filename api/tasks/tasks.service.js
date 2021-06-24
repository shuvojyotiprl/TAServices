const pool = require("../../config/database");

module.exports = {
  createTask: (user, task, callBack) => {

    var now = new Date();
    var issued_db_format = [
      now.getFullYear(), '-', now.getMonth(), '-', now.getDate(), ' ', now.getHours(), ':', now.getMinutes(), ':'
      , now.getSeconds()
    ].join('')


    var targated = new Date(task.targated);
    var targated_db_format = [
      targated.getFullYear(), '-', targated.getMonth(), '-', targated.getDate(), ' ', targated.getHours(), ':', targated.getMinutes(), ':'
      , targated.getSeconds()
    ].join('')

    pool.query(
      `insert into tasks(userid,taskname,description,priority,issued,targeted,status,type) 
                values(?,?,?,?,?,?,?,?)`,
      [
        user.id,
        task.taskname,
        task.description,
        task.priority,
        issued_db_format,
        targated_db_format,
        'DUE',
        task.type
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
  getAllTasks: (user, callBack) => {
    pool.query(
      `select taskid,userid,taskname,description,priority,issued,targeted,status,type from tasks where userid = ?`,
      [
        user.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getTaskbyId: (user, taskid, callBack) => {
    pool.query(
      `select taskid,userid,taskname,description,priority,issued,targeted,status,type from tasks where taskid = ? and userid = ?`,
      [
        taskid,
        user.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updatetask: (user, newtask, oldtask, callBack) => {


      if (newtask.taskname != null || newtask.taskname != undefined)
      oldtask.taskname = newtask.taskname

      if (newtask.description != null || newtask.description != undefined)
      oldtask.description = newtask.description

      if (newtask.priority != null || newtask.priority != undefined)
      oldtask.priority = newtask.priority

      if (newtask.issued != null || newtask.issued != undefined)
      oldtask.issued = newtask.issued

      if (newtask.targeted != null || newtask.targeted != undefined)
      oldtask.targeted = newtask.targeted

      if (newtask.status != null || newtask.status != undefined)
      oldtask.status = newtask.status

      if (newtask.type != null || newtask.type != undefined)
      oldtask.type = newtask.type


      console.log('**** After update *****')
      console.log(oldtask)


      pool.query(
        `update tasks set taskname=?, description=?, priority=?, issued=?, targeted=?, status=?,type=? where taskid = ?
              and userid=?`,
        [
          oldtask.taskname,
          oldtask.description,
          oldtask.priority,
          oldtask.issued,
          oldtask.targeted,
          oldtask.status,
          oldtask.type,
          oldtask.taskid,
          user.id
        ],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results[0]);
        }
      );
    

  }


};
