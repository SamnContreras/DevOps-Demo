const express = require("express");
const path = require("path");
const cors = require("cors");

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '741d678abd7e448eb8bc5c5e64ef7d47',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar

rollbar.log('Hello world!')

const app = express();

const sutdents = ["Sam"]

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    rollbar.info("HTML file served successfully");
});

app.get("/api./students", (req, res) => {
    rollbar.info("Someone got the list of students on page load");
    res.status(200).send(sutdents)
});

app.post("/api/students", (req, res) => {
    let {name} = req.body;
    name = name.trim();

    const index = students.findIndex((studentName) => studentName === name)

    if(index === -1 && name != "") {
        students.push(name);
        rollbar.log("Students added successfully", {author: "Sam", type: "manual entry"});
        res.status(200).send(students);
    } else if (name === "") {
        rollbar.error("No name given");
        res.status(400).send("Must provide a name");
    } else {
        rollbar.error("Student already exists");
        res.status(400).send("That student already exists")
    };
})

app.use(rollbar.errorHandler());

const port = process.env.PORT || 4545;

app.listen(port, () => {
    console.log(`teleportaion to ${port} was successful`)
});