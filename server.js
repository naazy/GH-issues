var http = require('http');
var https = require('https');
var fs = require('fs');
var querystring = require('querystring');

var index = fs.readFileSync(__dirname + '/index.html');

var port = 8008;



var sessions = {};

function handler (req,res){
  var redirect = 'https://github.com/login/oauth/authorize?client_id=a46dc0283bb124cf51cb';
  if (req.url==='/'){
    res.writeHead(302, {
      "Location": redirect
    });
    res.end();
  } else if(req.url.match('/issues')){
    loginHandler(req,res);
  } else if(req.url.match('/repo')){
    console.log(req);
    repoHandler(req,res);
  }
}

function loginHandler(req,res){
  var code = req.url.split('=')[1];
  var postData = querystring.stringify({
    client_id: "a46dc0283bb124cf51cb",
    client_secret: "bb95140f9f9f20c3be12abf33237e896e85c694b",
    code: code
  });

  var reqToGithub = https.request({
    hostname: 'github.com',
    path: '/login/oauth/access_token',
    method: 'POST'
  }, function(responseFromGithub) {
    console.log('im in the github response:---->'+responseFromGithub);
    responseFromGithub.on('data', function(chunk) {
      var accessToken = chunk.toString().split('access_token=')[1].split('&')[0];
      var cookie = Math.floor(Math.random() * 100000000);
      sessions[cookie] = accessToken;
      res.writeHead(200, { "Set-Cookie": 'access=' + cookie });
      res.end(index);
    });
  });
  reqToGithub.end(postData);
}

// function repoHandler(req,res){
//   https.request({
//     hostname: 'github.com',
//     path: 'repos/:naazy/:GH-issues/issues',
//     method: 'POST'
//   }, function

// )





http.createServer(handler).listen(port);
