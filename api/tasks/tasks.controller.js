const {
  createTask,
  getTaskbyId,
  getAllTasks,
  updatetask
} = require("./tasks.service");


const logger = require("./../log/logger")

module.exports = {
  createNewTask: (req, res) => {

    const user = req.decoded.result;
    const task = req.body;

    createTask(user, task, (err, results) => {
      if (err) {

        logger.info(err);
        return res.status(500).json({
          success: 0,
          message: "Database errror",
          details: err.sqlMessage
        });
      }

      return res.status(200).json({
        success: 1,
        data: results
      })

    });
  },

  findTaskById: (req, res) => {

    const user = req.decoded.result;
    const taskid = req.params.id;

    logger.info('Task Id =>' + taskid)
   

    getTaskbyId(user, taskid, (err, results) => {
      if (err) {

        logger.info(err);
        return res.status(500).json({
          success: 0,
          message: "Database errror",
          details: err.sqlMessage
        });
      }

      return res.status(200).json({
        success: 1,
        data: results
      })

    });
  },

  findAllTaks: (req, res) => {

    const user = req.decoded.result;



    getAllTasks(user, (err, results) => {
      if (err) {

        logger.info(err);
        return res.status(500).json({
          success: 0,
          message: "Database errror",
          details: err.sqlMessage
        });
      }

      return res.status(200).json({
        success: 1,
        data: results
      })

    });
  },

  updateTask: (req, res) => {

    const user = req.decoded.result;
    const taskupdate = req.body;
    const taskid = req.params.id;

    const TaskAllowedUpdates = ['taskname', 'description', 'priority', 'targeted', 'status', 'type']
    const updates = Object.keys(req.body)

    const isValidOperation = updates.every((update) => {
      //logger.info(update)
      return TaskAllowedUpdates.includes(update)
    })

    if (!isValidOperation) {
      return res.status(400).send({ error: 'invalid update ' })
    }

    getTaskbyId(user, taskid, (err, existingtask) => {
      if (err) {

        logger.info(err);
        return res.status(500).json({
          success: 0,
          message: "Database errror",
          details: err.sqlMessage
        });
      }

      if (existingtask == null || existingtask == undefined) {
        return res.status(404).json({
          success: 0,
          message: "task not found in db"
        });
      }
      logger.info('****OLD TASK***')
      logger.info(existingtask)
      logger.info('****NEW TASK***')
      logger.info(taskupdate)
      updatetask(user, taskupdate, existingtask, (err, results) => {
        if (err) {

          logger.info(err);
          return res.status(500).json({
            success: 0,
            message: "Database errror",
            details: err.sqlMessage
          });
        }

        return res.status(200).json({
          success: 1,
          data: "Task updated"
        })

      })


    });

  }

};
