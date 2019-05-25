var express = require('express');
var router = express.Router();

var scrumMeetings = []

router.get('/', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(scrum));
});

router.post('/create-scrum', function (request, response) {
  var scrum = request.body;

  var currentScrum = {
    id: scrumMeetings.length,
    meetingTitle: scrum.meetingTitle,
    totalTime: new Date(2019, 1, 15, 0, 11, 0),
    minutesPerGuest: scrum.minutesPerGuest,
    guests: scrum.guests
  }
  scrumMeetings.push(currentScrum);

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
  response.send(JSON.stringify(currentScrum.id));
});

router.get('/get-scrum', function (request, response) {
  var query = request.query;

  var currentScrum = scrumMeetings.find(scr => scr.id === parseInt(query.id));

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
  response.send(JSON.stringify(currentScrum));
});

module.exports = router;
