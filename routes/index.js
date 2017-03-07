const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');
const bodyParser = require('body-parser');




module.exports = function(io) {

  router.use(express.static('public'));
  //router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({extended:true}));

  router.get('/', function (req, res) {
    let tweets = tweetBank.list();
    //console.log('req body is',req.body);
    res.render( 'index', { tweets: tweets, showForm: true } );
  });

  router.get('/users/:name', function(req, res) {
    const name = req.params.name;
    const list = tweetBank.find( {name: name} );
    res.render( 'index', { tweets: list } );
  });

  router.get('/tweets/:id', function(req, res, next){
    const twitId = +req.params.id;
    const uniqTweet = tweetBank.find(['id',twitId]);
    //console.log(uniqTweet, 'twitId is', twitId);
    //console.log(res.render.toString());
    res.render('index', { tweets: uniqTweet });
  });

  router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    res.redirect('/');
  });
  return router;
};


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
