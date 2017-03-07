let express = require('express');
let morgan = require('morgan');
let nunjucks = require('nunjucks');
let fs = require('fs');

let logger = morgan('tiny');

let app = express();

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
//nunjucks.configure('views'); // point nunjucks to the proper directory for templates
nunjucks.configure('views', { noCache: true });

app.use(logger);
app.use(function (req, res, next) {
    // do your logging here
    console.log(req.method, req.url);
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding
    next();
});

app.use('/pupz', function(req, res, next){
    res.sendFile("/Users/strangefrond/fsa/twitter-js/views/index.html");
})

app.get('/', function(req, res, next){
  const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
  res.render( 'index', {title: 'Hall of Fame', people: people} );


})

app.listen(3000);


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
