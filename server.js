// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));
const port = 3000;

// Setup Server
const server = app.listen(port, listening);
function listening() {
  console.log("listening on port" + port);
}
//  GET Route
app.get("/data", sendData);
function sendData(request, response) {
  response.send(projectData);
}
// POST Route

app.post('/', (req, res) => {
  projectData.date = req.body.date;
  projectData.temperature = req.body.main.temp;
  projectData.feelings = req.body.feelings;
  console.log('POST request received');
  res.end();
})