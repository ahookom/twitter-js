const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const fs = require('fs');
const logger = morgan('tiny');
const app = express();
const routes = require('./routes');
const socketio = require('socket.io');


app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
//nunjucks.configure('views'); // point nunjucks to the proper directory for templates
nunjucks.configure('views', { noCache: true });
app.use(logger);
// app.use('/', routes);
app.use( '/', routes(io) );
// app.listen(3000);

var server = app.listen(3000);
var io = socketio.listen(server);

// var locals = {
//     title: 'An Example',
//     people: [
//         { name: 'Gandalf'},
//         { name: 'Frodo' },
//         { name: 'Hermione'},
//         { name: 'Grima'}
//     ]
// };
// nunjucks.configure('views', {noCache: true});

// nunjucks.render('index.html', locals, function (err, output) {
//   if (err) throw err;
//   console.log(output);
// });
