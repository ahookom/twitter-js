const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});


router.use(express.static('public'));
module.exports = router;


// app.use(function (req, res, next) {
//     // do your logging here
//     //console.log(req.method, req.url);
//     // call `next`, or else your app will be a black hole — receiving requests but never properly responding
//     res.send("<h1>Under Construction</h1>");
//     //next();
// });

// app.use('/pupz', function(req, res, next){
//     res.sendFile("views/index.html", {root: __dirname});
// });

// app.get("/tweets/", function(req,res,next){
//     res.sendFile()
// })

// app.get('/', function(req, res, next){
//   const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
//   res.render( 'index', {title: 'Hall of Fame', people: people} );


// });