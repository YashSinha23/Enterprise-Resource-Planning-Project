import express from "express";
import { getEmployees, addEmployee, getEmployee, updateEmployee, deleteEmployee } from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", getEmployees);  // GET all employees
router.post("/", addEmployee);  // Add employee

// GET single employee by emp_code
router.get('/:emp_code', getEmployee);

// PUT update employee by emp_code
router.put('/:emp_code', updateEmployee);

// DELETE employee by emp_code
router.delete('/:emp_code', deleteEmployee);

export default router;
