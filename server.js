const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const fs = require('fs');
const webpackConfig = require('./webpack.config.js');
const app = express();
const reviews = require('./reviews.json');
const calculations = require('./calculations.js');

const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/www'));

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: './bundle.js',
    publicPath: '/',
    stats: {
        colors: true,
    },
    historyApiFallback: true,
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));

app.get('/get-reviews', function(req, res) {
    res.send(reviews);
});

app.get('/general-average', function(req, res) {
    const average = (calculations.calculateGeneral(reviews)).toString();
    res.send(average);
});

app.get('/aspects-average', function(req, res) {
    const average = calculations.calculateAspects(reviews);
    res.send(average);
});

const server = app.listen(3000, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Reviews app listening at http://%s:%s', host, port);
});