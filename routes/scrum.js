var express = require('express');
var router = express.Router();

var scrum = {
    totalTime: new Date(2019, 1, 15, 0, 11, 0),
    minutesPerGuest: 1
}

router.get('/', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(scrum));
});

module.exports = router;
