require("dotenv").config();
const morgan = require('morgan')
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const taskRouter = require("./api/tasks/tasks.router")

const bodyparser = require("body-parser");

//app.use(express.json());

app.use(bodyparser.json())
app.use(
    bodyparser.urlencoded({
        extended : true
    })
); 
app.use(morgan('dev'))

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

const port = process.env.APP_PORT || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
