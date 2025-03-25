const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({ error: "Access denied" });
        return;
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid token" });
    }
};

module.exports = { authenticateUser };
