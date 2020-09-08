const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use(function(req, res, next) {
  if (req.get('X-Forwarded-Proto') !== 'https') {
    res.redirect('https://' + req.get('Host') + req.url);
  } else next();
});
app.get('/ping', function(req, res) {
  return res.send('pong');
});
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);
