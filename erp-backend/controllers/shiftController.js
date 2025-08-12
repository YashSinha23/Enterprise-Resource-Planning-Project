import pool from '../db.js';

export const getAllShifts = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM shifts ORDER BY shift_code'
    );
    res.json({ success: true, shifts: result.rows });
  } catch (err) {
    console.error('Error fetching shifts:', err);
    res.status(500).json({ success: false, error: 'Database error.' });
  }
};

export const addShift = async (req, res) => {
  const { shiftCode, shiftName, startTime, endTime } = req.body;
  if (!shiftCode || !shiftName || !startTime || !endTime) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO shifts (shift_code, shift_name, start_time, end_time) VALUES ($1, $2, $3, $4) RETURNING *',
      [shiftCode, shiftName, startTime, endTime]
    );
    res.status(201).json({ success: true, shift: result.rows[0] });
  } catch (err) {
    console.error('Error adding shift:', err);
    res.status(500).json({ success: false, error: 'Database error.' });
  }
};
