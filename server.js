const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

const sutdents = ["Sam"]

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api./stuends", (req, res) => {
    res.status(200).semd(sutdents)
});

const port = process.env.PORT || 4545;

app.listen(port, () => {
    console.log(`teleportaion to ${port} was successful`)
});