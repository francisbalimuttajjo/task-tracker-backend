const Task = require("../model/Task");
const { sendResponse } = require("../utils/fns");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
//creating task
exports.createTask = catchAsync(async (req, res, next) => {
  const { title, category, priority, steps, description, comments } = req.body;
  //checking to see if task with similar title for that particular user is available
  const tasks = await Task.find({ user: req.user._id });
  // console.log("tasks", tasks);
  const check = tasks.map((task) => task.title).includes(title);
  console.log("check", check);
  if (check)
    return next(new appError("project with title already exists", 400));
  const task = await Task.create({
    title,
    category,
    priority,
    steps,
    description,
    comments,
    user: req.user._id,
  });
  sendResponse(task, 201, req, res);
});

//getting tasks for a specific user
exports.getMyTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find({ user: req.user._id });
  // console.log(tasks)
  if (!tasks.length)
    return sendResponse("currently no projects available", 200, req, res);

  //sending response
  const response = { no: tasks.length, tasks };
  sendResponse(response, 200, req, res);
});

//for admin gettig tasks for all users
exports.getTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find();
  sendResponse({ no: tasks.length, tasks }, 200, req, res);
});
