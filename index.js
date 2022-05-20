// index.js
// This is our main server file

// A static server using Node and Express
const express = require("express");
// gets data out of HTTP request body 
// and attaches it to the request object
const bodyParser = require('body-parser');
//database operation
const fetch = require("cross-fetch");
const db = require('./sqlWrap');
const dbo = require('./databaseOps');
const { mostRecen } = require("./databaseOps");
// create object to interface with express
const app = express();
// Code in this section sets up an express pipeline
// print incoming url on console
app.use(function(req, res, next) {
  console.log("\n",req.method,req.url);
  next();
})

// print info about incoming HTTP request 
// for debugging
app.use(function(req, res, next) {
  console.log(req.method,req.url);
  next();
})
app.use(bodyParser.json());
// make all the files in 'public' available 
//app.use(bodyParser.text());
app.use(express.static("public"));

// if no file specified, return the main page
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/8-load.html");
});

app.post("/videoData", async function(req, res) {
  let vidObj=req.body;
  console.log(vidObj);
  console.log("sending Response");
  let n = await dbo.getNum();
  console.log(n+" items in the database");
  if(n<8){
      dbo.updateTable();
      dbo.insertVideo(vidObj)
    .then(function() {
      console.log("success!");
      return res.send('1');
    })
    .catch(function(err) {
      console.log("SQL error",err)} );
  }else{
    console.log("more tthan 8");
    return res.send('0');
  }
});

app.post("/deleted", async function(req, res) {
  
  let name=req.body;
  console.log("servder post: req ", name.name);
  let result=await dbo.delVideo(name.name);
  res.send(result);
});

app.get("/checknum", async function (req,res) {
  let n = await dbo.getNum();
  if(n<8){
  return res.send('1');
  }else{
    return res.send("0");
  }
});

app.get("/getMostRecent", async function (req,res) {
  let result= await dbo.mostRecen();
  console.log("server get most", result.url);
  let url=result.url;
  res.send(url);
});

app.get("/getList", async function (req,res) {
  let result= await dbo.dumpTable();
  console.log("get all", result.slice(1));
  //console.log("get nameeee", names);
  let names= result.map(function(a) {return a.nickname;});
  //console.log("get names", names);
  //res.send(JSON.stringify(names));
  res.json(names);
});

// Need to add response if page not found!
app.use(function(req, res){
  res.status(404); res.type('txt'); 
  res.send('404 - File '+req.url+' not found'); 
});

// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});
