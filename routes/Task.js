const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/Task");
const auth = require("../controllers/auth");

router.route("/myTasks").get(auth.isAllowed, taskController.getMyTasks);
router
  .route("/tasks")
  .post(auth.isAllowed, taskController.createTask)
  .get(auth.isAllowed, taskController.getTasks)
  

  router
  .route("/tasks/:id")
  .delete(auth.isAllowed, taskController.deleteTask);

module.exports = router;
