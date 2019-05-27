var express = require('express');
var router = express.Router();

var scrumMeetings = [
  {
    "id": 1,
    "meetingTitle": "test",
    "totalTime": new Date(2019, 1, 15, 0, 11, 0),
    "minutesPerGuest": 10,
    "guests": []
  }
]

router.get('/', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(scrumMeetings));
});

router.get('/delete-scrums', function (req, res) {
  scrumMeetings = []

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.sendStatus(200);
});

router.get('/delete-scrum', function (req, res) {
  var query = req.query;
  
  var indexToRemove = scrumMeetings.findIndex(scr => scr.id === parseInt(query.id))

  if(indexToRemove !== -1) {
    scrumMeetings.splice(indexToRemove)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendStatus(200);
  }
  else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send("The scrum does not exist.");
  }
});

router.post('/create-scrum', function (request, response) {
  var scrum = request.body;

  var currentScrum = {
    "id": scrumMeetings.length,
    "meetingTitle": scrum.meetingTitle,
    "totalTime": new Date(2019, 1, 15, 0, 11, 0),
    "minutesPerGuest": scrum.minutesPerGuest,
    "guests": scrum.guests
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