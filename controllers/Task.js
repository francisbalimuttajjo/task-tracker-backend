const mongoose = require("mongoose");
const Task = require("../model/Task");

exports.createTask = async (req, res) => {
  try {
    console.log(req.body);

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
      data: tasks,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
