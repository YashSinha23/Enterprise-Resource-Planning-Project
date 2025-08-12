// server.js (or index.js)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import shiftRoutes from "./routes/shiftRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
    origin: "http://localhost:5173", // Limit to your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// Test DB connection route
app.get("/api/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ success: true, time: result.rows[0] });
    } catch (err) {
        console.error("Database connection error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Employee routes
app.use("/api/employees", employeeRoutes);

// Shift routes
app.use("/api/shifts", shiftRoutes);

// 404 handler for unmatched routes
app.use((req, res) => {
    res.status(404).json({ success: false, error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Server error:", err.stack);
    res.status(500).json({ success: false, error: "Internal server error" });
});

app.listen(PORT, async () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);

    // Test DB connection at startup
    try {
        const result = await pool.query("SELECT NOW()");
        console.log(`📅 Database connected: ${result.rows[0].now}`);
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
    }
});
