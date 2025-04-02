const jwt = require("jsonwebtoken");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYW5lZXRoYTc1OTdAZ21haWwuY29tIiwiaWF0IjoxNzQyNjYyMzY0fQ.D6fH9_1eZfg73kvHczV6mehSqulRFsu0JjT09KQWino";
console.log(jwt.decode(token));
