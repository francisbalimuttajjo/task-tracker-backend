const express = require('express')
const router = express.Router()
const taskController = require('../Controllers/Task')



router.route('/tasks')
.post( taskController.createTask)
.get(taskController.getTasks)












module.exports = router