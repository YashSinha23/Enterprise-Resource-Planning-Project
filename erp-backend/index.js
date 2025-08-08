import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ success: true, time: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});
