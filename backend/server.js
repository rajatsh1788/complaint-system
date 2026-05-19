const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// =======================
// MIDDLEWARE
// =======================

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "https://complaint-frontend.onrender.com"
    ],
    credentials: true,
  })
);

// =======================
// ROUTES
// =======================

const complaintRoutes =
  require("./routes/complaintRoutes");

const authRoutes =
  require("./routes/authRoutes");

const aiRoutes =
  require("./routes/aiRoutes");

app.use(
  "/api/complaints",
  complaintRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

// =======================
// TEST ROUTE
// =======================

app.get("/", (req, res) => {

  res.send(
    "Complaint Management Backend Running"
  );
});

// =======================
// DATABASE CONNECTION
// =======================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log(
      "MongoDB Connected Successfully"
    );

    app.listen(
      process.env.PORT || 5000,
      () => {

        console.log(
          `Server Running on Port ${
            process.env.PORT || 5000
          }`
        );
      }
    );
  })

  .catch((error) => {

    console.log(
      "MongoDB Connection Error:",
      error
    );
  });