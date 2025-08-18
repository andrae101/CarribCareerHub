// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Allow your site to call the API
app.use(cors({
  origin: [
    "https://www.carribcareerhub.site",
    "https://carribcareerhub.site",
    "http://localhost:5500" // local preview if you ever need it
  ]
}));
app.use(express.json());

// Use environment variable in the cloud, fallback to local if needed
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/carribcareerhub";

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Schemas
const JobSchema = new mongoose.Schema({
  title: String,
  location: String,
  company: String,
  description: String,
  requirements: [String]
});
const Job = mongoose.model("Job", JobSchema);

const ApplicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  resume: String,       // for now just store text/URL
  coverLetter: String,
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  createdAt: { type: Date, default: Date.now }
});
const Application = mongoose.model("Application", ApplicationSchema);

// Routes
app.get("/", (req, res) => res.send("CarribCareerHub API is running 🚀"));

// Get all jobs
app.get("/api/jobs", async (req, res) => {
  const jobs = await Job.find().sort({ _id: -1 });
  res.json(jobs);
});

// Create a new job
app.post("/api/jobs", async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json(job);
});

// Submit an application
app.post("/api/apply", async (req, res) => {
  const application = new Application(req.body);
  await application.save();
  res.json({ ok: true, message: "Application received", application });
});

// Quick health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Seed sample jobs (run once by visiting this URL)
app.get("/api/seed", async (req, res) => {
  const sample = [
    {
      title: "Software Engineer",
      location: "Kingston, Jamaica",
      company: "Caribbean Tech Solutions",
      description: "Build and ship web apps.",
      requirements: ["JavaScript", "Node.js", "React"]
    },
    {
      title: "Marketing Specialist",
      location: "Bridgetown, Barbados",
      company: "Island Brands Ltd.",
      description: "Plan and run campaigns.",
      requirements: ["Content", "Social Media", "Analytics"]
    },
    {
      title: "Hospitality Manager",
      location: "Montego Bay, Jamaica",
      company: "Caribbean Resorts Group",
      description: "Lead operations and guest experience.",
      requirements: ["Leadership", "Operations", "Customer Service"]
    }
  ];
  await Job.deleteMany({});
  const created = await Job.insertMany(sample);
  res.json({ ok: true, count: created.length });
});

// Use the port Render gives us, or 5000 locally
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server listening on ${PORT}`));
