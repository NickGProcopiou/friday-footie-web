/**
 * Created by Nick on 12/09/2015.
 */

var express = require('express');
var path = require('path');
var app = express();

app.get('/play*',function(req,res){
    res.sendFile(path.join(__dirname+'/play.html'));
});

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/splash.html'));
});

app.get('/user*',function(req,res){
    res.sendFile(path.join(__dirname+'/user.html'));
});

app.use('/assets', express.static('generated'));
app.use('/images', express.static('../styles/images'));
app.use('/fonts', express.static('../styles/fonts'));
app.use('/api', express.static('../scripts/api'));

var server = app.listen(8888, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});