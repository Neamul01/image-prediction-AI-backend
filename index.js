const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const imageRoutes = require("./src/routes/imageRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

// MongoDB connection
// mongoose.connect('mongodb://localhost:27017/collie-ai', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the AI Web App!");
});

app.use("/api", imageRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
