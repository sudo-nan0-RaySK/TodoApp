var express = require('express');
var router = express.Router();
let mysql = require('../db/db');
let bcrypt = require('bcrypt');
let middlwares = require('../middlewares/middlewares');

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
        let queryString = 'SELECT text,title,category,due_date FROM todos INNER JOIN agents ON todos.agent_id = agents.agent_id WHERE todos.agent_id = ? order by due_date;';
        mysql.query(queryString, agent_id, (err, result) => {
            todos = []
            result.forEach(element => {
                todos.push(element);
            });
            res.status(200).json({ list: todos });
        });
    } else {
        res.status(401).json({ msg: 'Unauthorized' });
    } 
});

router.post('/sites/', (req, res, next) => {
    let { title, description, category, due_date } = req.body;
    let agent_id = req.query['agent'];
    console.log(req.session.user);
    if (agent_id === req.session.user) {
        let queryString = 'INSERT INTO todos(text,title,category,due_date,agent_id) VALUES(?,?,?,?,?);';
        mysql.query(queryString, [description, title, category, due_date, agent_id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: 'Server error!' });
            } else {
                res.status(200).json({ status: "success" });
           }
        });
    } else {
        res.status(401).json({ msg: 'Unauthorized' });
    }
});



module.exports = router;