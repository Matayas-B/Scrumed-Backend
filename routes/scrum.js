var express = require('express');
var router = express.Router();
var scrumRepo = require('../repositories/scrum_repository');

router.get('/', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(scrumRepo.getScrums()));
});

router.get('/delete-scrums', function (req, res) {
  scrumRepo.deleteScrums();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.sendStatus(200);
});

router.get('/delete-scrum', function (req, res) {
  var query = req.query;

  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    scrumRepo.deleteScrum(parseInt(query.id));
    res.sendStatus(200);
  } catch (error) {
    res.send(error.message);
  }
});

router.post('/create-scrum', function (request, response) {
  var scrum = request.body;
  var newScrumId = scrumRepo.createScrum(scrum);

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
  response.send(JSON.stringify(newScrumId));
});

router.get('/get-scrum', function (request, response) {
  var query = request.query;

  response.setHeader('Access-Control-Allow-Origin', '*');
  try {
    var currentScrum = scrumRepo.getScrum(parseInt(query.id));
    response.send(JSON.stringify(currentScrum));
  } catch (error) {
    response.send(error.message);
  }
});

module.exports = router;