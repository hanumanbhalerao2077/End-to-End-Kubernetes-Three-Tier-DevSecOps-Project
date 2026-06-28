const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const tasks = require("./routes/tasks");

const app = express();

app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/ready", (req, res) => {
  const isDbConnected = require("mongoose").connection.readyState === 1;
  res.status(isDbConnected ? 200 : 503).json({ status: isDbConnected ? "ready" : "not-ready" });
});

app.get("/started", (req, res) => {
  res.status(200).json({ status: "started" });
});

app.use("/api/tasks", tasks);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, error: err.message || "Internal server error" });
});

module.exports = app;
