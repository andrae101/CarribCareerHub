
// CarribCareerHub Backend - Express Server
const express = require("express");
const cors = require("cors");
const jobsRouter = require("./routes/jobs");
const applyRouter = require("./routes/apply");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/jobs", jobsRouter);
app.use("/api/apply", applyRouter);

// Default route
app.get("/", (req, res) => {
  res.send("CarribCareerHub Backend is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
