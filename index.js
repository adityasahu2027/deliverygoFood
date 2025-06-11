const express = require("express");
const app = express();
const port = 5000;
const mongoDb = require("./db");
mongoDb();

// Middleware to handle CORS and JSON parsing
// This allows the frontend to communicate with the backend without CORS issues
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

app.use(express.json());

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/Orderdata"));
app.use("/api", require("./Routes/Mydata"));
app.listen(port, () => {
  console.log(`Server is running on http://localhost: ${port}`);
});
