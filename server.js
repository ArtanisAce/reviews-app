const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const fs = require('fs');
const webpackConfig = require('./webpack.config.js');
const app = express();
const reviews = require('./reviews.json'); //LO CARGAMOS ASI? SERIA SINCRONO...
const calculations = require('./calculations.js');

const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/www'));

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
        colors: true,
    },
    historyApiFallback: true,
}));

// Read json data
// fs.readFile('reviews.json', 'utf8', function(error, data) {
//     const obj = JSON.parse(data);
//     console.log(obj);
// });

app.get('/calculate-average', function(req, res) {
    const average = (calculations.calculateGeneral(reviews)).toString();
    res.send(average);
});

const server = app.listen(3000, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Reviews app listening at http://%s:%s', host, port);
});