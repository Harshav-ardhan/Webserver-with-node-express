const express = require('express');
const router = express.Router();
const path = require('path');
const emp = require('../../controllers/employeecontroller.js')

// data={};
// data.employee = require('../../models/employee.json');

router.route('/')
.get(emp.getAllEmployees)
.post(emp.createNewEmployee)
.put(emp.updateEmployee)
.delete(emp.deleteEmployee)
router.route('/:id')
.get(emp.getEmployee)
module.exports = router;
