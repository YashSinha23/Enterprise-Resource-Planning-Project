import pool from "../db.js";

// Get all employees
export const getEmployees = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM employees ORDER BY emp_code ASC");
        res.json({ success: true, data: result.rows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Add new employee
export const addEmployee = async (req, res) => {
    const { emp_code, name, role, contact, email, address, joining_date } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO employees (emp_code, name, role, contact, email, address, joining_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
            [emp_code, name, role, contact, email, address, joining_date]
        );
        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
