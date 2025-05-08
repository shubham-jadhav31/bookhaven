import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret";

// Register
export const registerUser = async (req, res, next) => {
  const { name, email, password, phone, location } = req.body;
  console.log("Register Body: ", req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await pool.query(
      `INSERT INTO users (name, email, password, phone, location) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email`,
      [name, email, hashedPassword, phone, location]
    );

    res.status(201).json({ user: user.rows[0] });
  } catch (err) {
    next(err);
  }
};

// Login
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userRes = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = userRes.rows[0];
    if (!user) return res.status(401).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id, isAdmin: user.is_admin }, JWT_SECRET, {
      expiresIn: "2d",
    });
    console.log("Token: ");

    res.json({ token });
  } catch (err) {
    next(err);
  }
};
