var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack/dev.config');

var compiler = webpack(config);
var serverOptions = {
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
};

var app = express();
app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
  console.log(req.url);
  res.sendFile(path.join(__dirname, './static/dist/index.html'));
});

app.listen(3001, 'localhost', function onAppListening(err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Listening at http://localhost:3001');
});