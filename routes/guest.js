var express = require('express');
var router = express.Router();

var guestList = [];

router.get('/', function (request, response) {
  response.send(JSON.stringify(guestList));
});

router.post('/add-guest', function (request, response, next) {
  var guest = request.body;
  guestList.push({
    name: guest.name,
    turn: (Math.max.apply(Math, guestList.map(function (guest) { return guest.turn })) + 1),
    isActive: guestList.length > 0 ? false : true
  });
  response.send(JSON.stringify(guestList));
});

module.exports = router;
