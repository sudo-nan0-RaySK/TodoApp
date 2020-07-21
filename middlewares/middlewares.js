var express = require('express');
var router = express.Router();

function alreadyLoggedIn(req, res, next) {
    console.log('MIDDLEWARE : ', req.session.user);
    if (req.session.user) {
        res.redirect('/');
    } else {
        next();
    }
}

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        res.status(401).json({ msg: 'Unauthorized' });
    } else {
        next();
    }
}

module.exports = { alreadyLoggedIn, isAuthenticated };