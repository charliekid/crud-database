var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let query = 'SELECT DISTINCT * FROM l9_author';

    db.query(query, (err, result) => {
        if(err) {
            res.render('layouts/error');
        }
        console.log();
        res.render('layouts/index', {
            title: 'Author List',
            author: result
        });
    });
});

router.get('/add', function(req, res, next) {
    res.render('layouts/add-author', {
        title: 'Add Author'
    });
});

router.get('/edit/:id', function(req, res, next) {
    let authorId = req.params.id;

    let query = "SELECT * FROM `l9_author` WHERE authorId = '" + authorId + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        //console.log('result: ', result);
        res.render('layouts/edit-author', {
            title: "Edit  Author",
            author: result,
            id: authorId
        });
    });
});

router.get('/delete/:id', function(req, res, next) {
    let authorId = req.params.id;
    let query = "SELECT * FROM `l9_author` WHERE authorId = '" + authorId + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        //console.log('result: ', result[0]);
        res.render('layouts/delete-author', {
            title: "Delete Author",
            author: result
        });
    });
});

router.post('/add', function(req, res, next) {
    let firstName = req.body.first_name;
    let lastName = req.body.last_name;
    let dob = req.body.date_picker_DOB;
    let dod = req.body.date_picker_DOD;
    let gender = req.body.gender;

    //query to add author in

    let query = "INSERT INTO `l9_author` (firstName, lastName, dob, dod, sex) VALUES ('" +
        firstName + "', '" + lastName + "', '" + dob + "', '" + dod + "', '" + gender + "')";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
});

router.post('/edit/:id', function(req, res, next) {
    console.log('inside POST for edit', req.body);
    console.log('getting inside the body', req.body.firstName);
    console.log('lastNight: ', req.body.lastName);
    console.log('dob: ', req.body.dob);
    console.log('dod: ', req.body.dod);
    console.log('sex: ', req.body.sex);

    let authorId = req.params.id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let dob = req.body.dob;
    let dod = req.body.dod;
    let gender = req.body.sex;

    //let query = "UPDATE `authors` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `authors`.`id` = '" + authorId + "'";
   //let query = "UPDATE `l9_author` SET `firstName` ='" + req.body.firstName + "', `lastName` = '" + req.body.lastName  + "', `dob` = '" + req.body.dob + "', `dod` = '" + req.body.dod + "', `sex` = '" + req.body.sex + "' WHERE `authorId` = '" + authorId + "'";

    let query = "UPDATE `l9_author` SET `firstName` ='" + req.body.firstName + "', `lastName` = '" + req.body.lastName  + "', `dob` = '" + req.body.dob + "', `dod` = '" + req.body.dod + "', `sex` = '" + req.body.sex + "' WHERE `authorId` = '" + authorId + "'";

    console.log('query string: ', query);

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
 });

router.post('/delete/:id', function(req, res, next) {
    let authorId = req.params.id;
    let query = "DELETE FROM `l9_author` WHERE authorId = '" + authorId + "'";
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
});


module.exports = router;
