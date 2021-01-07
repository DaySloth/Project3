//setting up node env variable reading
const express = require("express");
var session = require("express-session");
require("dotenv").config();
const routes = require("./routes");

//getting express server
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Requiring passport as we've configured it
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
const passport = require("./config/passport.js");
app.use(passport.initialize());
app.use(passport.session());

// Need to add routes here
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/congo", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});