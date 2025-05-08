import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import errorHandling from "./middlewares/errorHandler.js";
import router from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js";


dotenv.config({ path: path.resolve('src', '.env') });

const app = express(); 
const port = process.env.PORT || 3001;

// Middlewaress
app.use(express.json());
// app.use(cors());
app.use(cors({
    origin: 'http://bookhaven-frontend-app.s3-website.ap-south-1.amazonaws.com', // Actual S3 URL
    credentials: true
  }));

app.use((req, res, next) => {
    const time = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });
    console.log(`[${time}] ${req.method} ${req.originalUrl}`);
    next();
});


// Error handling
app.use(errorHandling);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/", authMiddleware, router);
app.use("/admin/", authMiddleware, adminRouter);


// base
app.get("/", async(req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name: ${result.rows[0].current_database}`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});