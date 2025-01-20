const jwt = require("jsonwebtoken");
const JWT_SECRET  = "123";
function verifyToken(req, res, next) {
  
  const token = req?.cookies?.userDetails;
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized request." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "not verified Unauthorized request." });
    }

    req.userId = decoded._id;
    
    req.enrollmentID = decoded.enrollmentID;
    next();
  });
}

module.exports = verifyToken;