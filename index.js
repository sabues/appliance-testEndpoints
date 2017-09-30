var express = require('express');  
var path = require('path');  
var app = express();  
var router = express.Router();

app.use(router);  

// mock endpoints (0=OK, 1=TOOMANYREQUEST, 2=ERR)
// based on https://auth0.com/docs/appliance/monitoring/authenticated-endpoints

var OK      =0,
    TOOMANY =1, 
    ERR     =2;

// set them manually here
var status = {
    testall:    OK,
    cpu:        OK,
    memory:     OK,
    disk:       OK,
    services:   ERR,
    network:    OK,
    internet:   OK,
    email:      ERR,
    db:         OK,
    replicaset: OK
}

// or wait for failure interval
setInterval(testallfail, 14*60*1000);
setInterval(diskwarn, 60*60*1000);
setInterval(replicasetfail, 25*60*1000);

function testallfail(){
    status.testall = ERR;
    setInterval(testallwork, 3*60*1000);
}

function testallwork(){
    status.testall = OK;
}

function diskwarn(){
    status.disk = TOOMANY;
    setInterval(diskfail, 10*60*1000);
}

function diskfail(){
    status.disk = ERR;
    setInterval(diskwork, 10*60*1000);
}

function diskwork(){
    status.disk = OK;
}

function replicasetfail(){
    status.replicaset = ERR;
    setInterval(replicasetwork, 3*60*1000);
}

function replicasetwork(){
    status.replicaset = OK;
}

router.all('/', function (req, res, next) {  
  console.log('Someone made a request!');
  next();
});

router.get('/testall', function (req, res) { 
    if (!status.testall){
        res.status(200);
        res.send('OK');
    } else {
        res.status(520);
        res.send('Server Down');
    }
});

router.get('/status/cpu', function (req, res) { 
    if (status.cpu== OK){
        res.status(204);
        res.send();
    } else if (status.cpu == ERR) {
        res.status(520);
        res.send('There is an issue with the resource');
    } else if (status.cpu == TOOMANY) {
        res.status(429);
        res.send('Too many requests have been made to the resource');
    } else {
        res.status(500);
        res.send('Internal Server Error');
    }
});

router.get('/status/memory', function (req, res) { 
    if (status.memory== OK){
        res.status(204);
        res.send();
    } else if (status.memory == ERR) {
        res.status(520);
        res.send('There is an issue with the resource');
    } else if (status.memory == TOOMANY) {
        res.status(429);
        res.send('Too many requests have been made to the resource');
    } else {
        res.status(500);
        res.send('Internal Server Error');
    }
});

router.get('/status/disk', function (req, res) { 
    if (status.disk== OK){
        res.status(204);
        res.send();
    } else if (status.disk == ERR) {
        res.status(520);
        res.send('There is an issue with the resource');
    } else if (status.disk == TOOMANY) {
        res.status(429);
        res.send('Too many requests have been made to the resource');
    } else {
        res.status(500);
        res.send('Internal Server Error');
    }
});

router.get('/status/email', function (req, res) { 
    if (status.email== OK){
        res.status(204);
        res.send();
    } else if (status.email == ERR) {
        res.status(520);
        res.send('There is an issue with the resource');
    } else if (status.email == TOOMANY) {
        res.status(429);
        res.send('Too many requests have been made to the resource');
    } else {
        res.status(500);
        res.send('Internal Server Error');
    }
});

router.get('/status/db', function (req, res) { 
        res.status(204);
        res.send();
});

router.get('/status/replicaset', function (req, res) { 
    if (status.replicaset== OK){
        res.status(204);
        res.send();
    } else if (status.replicaset == ERR) {
        res.status(520);
        res.send('There is an issue with the resource');
    } else {
        res.status(500);
        res.send('Internal Server Error');
    }
});

router.get('/status/services', function (req, res) { 
    if (status.services == OK){
        res.status(204);
        res.send();
    } else if (status.services == ERR) {
        res.status(520);
        res.send('There is an issue with the resource');
    } else {
        res.status(500);
        res.send('Internal Server Error');
    }
});


app.listen(9110);  
module.exports = app;  


//9z8U3YVtjPlOB5kJw7Pw0Wt2tnSvYzq8hg7mhpZu0RocbeY4