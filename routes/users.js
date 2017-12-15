var express = require('express');
var router = express.Router();

//Get users listing 
router.get('/',function(req, res, next){
    res.send('Response With a resource')
});

module.exports = router