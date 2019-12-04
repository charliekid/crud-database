var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let query = 'SELECT DISTINCT * FROM l9_author'

    db.query(query, (err, result) => {
        console.log(result.firstName);
        res.render('layouts/index', {
            title: 'Author List',
            author: result
        });
    });
});

router.get('/add', function(req, res, next) {

});

router.get('/edit/:id', function(req, res, next) {

});

router.get('/delete/:id', function(req, res, next) {

});

router.post('/add', function(req, res, next) {

});

router.post('/edit/:id', function(req, res, next) {

});

router.post('/delete/:id', function(req, res, next) {

});




module.exports = router;
