const express = require("express");
const router = express.Router();
const employeeController = require("../../controller/employeeController");
router
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(employeeController.createEmployee)
  .put(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);
router.route("/:id").get(employeeController.getEmployee);
module.exports = router;
