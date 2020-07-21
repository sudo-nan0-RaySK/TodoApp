var express = require('express');
var router = express.Router();
let mysql = require('../db/db');
let bcrypt = require('bcrypt');
let middlwares = require('../middlewares/middlewares');
/* GET home page. */
router.get('/', function (req, res, next) {
    let queryString = `SELECT * FROM user;`;
    mysql.query(queryString, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
    res.render('index', { title: 'Express' });
});


/* POST Create an account */

router.post('/agent', (req, res, next) => {
    let { agent_id, password } = req.body;
    // Hash the password
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) console.log(err);
        password = hash;
        console.log(password);

        // Insert into DB
        let queryString = `INSERT INTO agents VALUES (?,?);`;
        mysql.query(queryString, [agent_id, password], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: 'Server error' });
            } else {
                console.log(result);
                res.status(200).json({
                    status: 'Account created',
                });
           }
        });
    });
});

router.post('/agent/auth', middlwares.alreadyLoggedIn ,(req, res, next) => {
    let { agent_id, password } = req.body;
    let queryString = `SELECT agent_id,password FROM agents WHERE agent_id=?`;
    mysql.query(queryString, agent_id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ err: 'Server error' });
        } else {
            if (result.length == 0) {
                res.status(401).json({ succes: false });
            } else {
                console.log(result[0]['password']);
                bcrypt.compare(password, result[0]['password'], function (err, matched) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ err: 'Server error' });
                    } else {
                        if (matched) {
                            req.session.user = result[0]['agent_id'];
                            res.status(200).json({ status: 'success', 'agent_id': result[0]['agent_id'] });
                        } else {
                            res.status(401).json({ status: 'failure' });
                        }
                    }
                }); 
            }
       }
    });
});

router.get('/sites/list/', (req, res, next) => {
    let agent_id = req.query['agent'];
    console.log(req.session.user);
    if (agent_id == req.session.user) {
        let queryString = ''
        res.sendStatus(200);
    } else {
        res.status(401).json({ msg: 'Unauthorized' });
    } 
});

module.exports = router;