//pull in all the dependencies
let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let morgan = require("morgan");
let mongoose = require("mongoose");

//initialize and setup express
let app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

//import the Secret model
require("./models/Secret");

//import the routes
app.use(require("./routes"));

//easy to refer to long string, connection to our mongodb
let mongoDB = "mongodb://user:password1@ds115753.mlab.com:15753/vinny";

//connect to the database!
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);

//get the connection
let db = mongoose.connection;
//on an error, output to the console
db.on("error", error => console.log("connection error: " + error));
//on connection open, output and tell app we are ready
db.once("open", () => {
  console.log("connected to database...");
  //broadcast a ready event
  app.emit("ready");
});

//listen to the ready event
app.on("ready", () => {
  //setup our app to listen on a port and start up
  let server = app.listen(8080, () => {
    let port = server.address().port;
    //output to console the port we are using
    console.log("running on", port);
  });
});
