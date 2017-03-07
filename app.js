let express = require('express');
let morgan = require('morgan');
let logger = morgan("tiny");

let app = express();

app.use(logger);
app.use(function (req, res, next) {
    // do your logging here
    console.log(req.method, req.url);
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding
    next();
});

app.use('/pupz', function(req,res,next){
    res.send("<p>pupz func</p>");
})

app.listen(3000);