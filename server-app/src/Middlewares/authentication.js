const jwt = require("jsonwebtoken");
const User = require("../Models/user");

async function isAuthenticRequest(request, response, next) {
  try {
    const token = request.cookies.jwt;

    if (!token) {
      return response
        .status(401)
        .json({ message: "Unauthorized - No Token provided" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return response
        .status(401)
        .json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    request.user = user;
    next();
  } catch (error) {
    console.error("Error in isAuthenticateRequest middleware", error.message);
    response.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = isAuthenticRequest;
