
const Task = require("../model/Task");

exports.createTask = async (req, res) => {
  try {
    

    const task = await Task.create(req.body);
    res.status(200).json({
      status: "success",
      data: task,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      status: "success",
       tasks,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
