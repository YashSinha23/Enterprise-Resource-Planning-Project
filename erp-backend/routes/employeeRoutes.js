import express from "express";
import { getEmployees, addEmployee } from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", getEmployees);  // GET all employees
router.post("/", addEmployee);  // Add employee

export default router;
