var express = require('express');
var router = express.Router();
let mysql = require('../db/db');
/* GET home page. */
// router.get('/', function (req, res, next) {
//   queryString = `SELECT * FROM user;`;
//   mysql.query(queryString, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//     }
//   });
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
