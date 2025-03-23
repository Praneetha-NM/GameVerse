const jwt = require("jsonwebtoken");
require("dotenv").config();
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYW5lZXRoYTc1OTdAZ21haWwuY29tIiwiaWF0IjoxNzQyNjYyMzY0fQ.D6fH9_1eZfg73kvHczV6mehSqulRFsu0JjT09KQWino";

try {
    const decoded = jwt.verify(token, "aVerySuperSecretKey123"); 
    console.log("✅ Token is valid:", decoded);
    console.log("Secret Key:", process.env.JWT_SECRET_KEY); // Debugging
} catch (error) {
    console.error("❌ Invalid Token:", error.message);
}
