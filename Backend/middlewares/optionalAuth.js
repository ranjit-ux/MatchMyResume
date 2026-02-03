import jwt from "jsonwebtoken";

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // logged-in user
    } catch (err) {
      req.user = null; // invalid token → treat as guest
    }
  } else {
    req.user = null; // no token → guest
  }

  next();
};

export default optionalAuth;
