import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("Auth Header Error -- Missing Token");
    return res.status(401).json({ msg: "Missing token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId, isAdmin }
    // console.log("middleware user: ", req.user);
    next();
  } catch (err) {
    console.log("Invalid Token for this request");
    res.status(401).json({ msg: "Invalid token" });
  }
};

export default authMiddleware;
