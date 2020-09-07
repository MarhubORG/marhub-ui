const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function(req, res) {
  console.log('pong debug');
  return res.send('pong');
});
app.use(function(req, res, next) {});
app.get('/*', function(req, res) {
  console.log('inside redirect');
  if (req.secure) {
    console.log('secure');
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  } else {
    console.log('redirect');
    res.redirect('https://' + req.headers.host + req.url);
  }
});
app.listen(port);
