const express = require("express");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();

// Connect to DB

app.get("/", (req, res) => res.send("hello !"));

//Use Routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
