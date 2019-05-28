var express = require('express');
var router = express.Router();
var scrumRepo = require('../repositories/scrum_repository');
var scrumValidator = require('../validators/scrum_validator');

router.get('/', function (request, response) {
  response.send(JSON.stringify(scrumRepo.getScrums()));
});

router.get('/delete-scrums', function (request, response) {
  scrumRepo.deleteScrums();
  response.sendStatus(200);
});

router.get('/delete-scrum', function (request, response) {
  var query = request.query;

  try {
    scrumRepo.deleteScrum(parseInt(query.id));
    response.sendStatus(200);
  } catch (error) {
    response.send(error.message);
  }
});

router.post('/create-scrum', function (requestuest, response) {
  var scrum = requestuest.body;

  if (!scrumValidator.isValid(scrum)) {
    response.send("This is not a valid Scrum.");
  }

  var newScrumId = scrumRepo.createScrum(scrum);
  response.send(JSON.stringify(newScrumId));
});

router.get('/get-scrum', function (requestuest, responseponse) {
  var query = requestuest.query;

  try {
    var currentScrum = scrumRepo.getScrum(parseInt(query.id));
    responseponse.send(JSON.stringify(currentScrum));
  } catch (error) {
    responseponse.send(error.message);
  }
});

module.exports = router;