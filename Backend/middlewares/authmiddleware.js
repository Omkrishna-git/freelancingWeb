const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

module.exports = authMiddleware;
