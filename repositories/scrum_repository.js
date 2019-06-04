var crypto = require('crypto');

var scrumRepo = {};

var scrumMeetings = [
    {
        "id": "e4f69194262e1690d6fcc956d4f1c3ff",
        "meetingTitle": "TEST SCRUM",
        "totalTime": 5,
        "minutesPerGuest": 1,
        "isCountdown": true,
        "guests": [
            {
                "participantName": "Matayas",
                "participantTurn": 1,
                "isActiveParticipant": true
            },
            {
                "participantName": "Lucho",
                "participantTurn": 2,
                "isActiveParticipant": false
            },
            {
                "participantName": "Lucas",
                "participantTurn": 3,
                "isActiveParticipant": false
            },
            {
                "participantName": "Laychu",
                "participantTurn": 4,
                "isActiveParticipant": false
            },
            {
                "participantName": "Fede",
                "participantTurn": 5,
                "isActiveParticipant": false
            }
        ]
    }
]

scrumRepo.getScrums = function () {
    return scrumMeetings;
}

scrumRepo.getScrum = function (id) {
    var currentScrum = scrumMeetings.find(scr => scr.id === id);
    if (currentScrum === undefined) {
        throw new Error("Scrum meeting does not exist.");
    }

    return currentScrum;
}

scrumRepo.deleteScrums = function () {
    scrumMeetings = [];
}

scrumRepo.deleteScrum = function (id) {
    var indexToRemove = scrumMeetings.findIndex(scr => scr.id === id)

    if (indexToRemove === -1) {
        throw new Error("Scrum meeting does not exist.");
    }
    scrumMeetings.splice(indexToRemove, 1);
}

scrumRepo.createScrum = function (scrumBody) {
    var newScrum = {
        "id": crypto.createHash('md5').update(scrumBody.meetingTitle + scrumMeetings.length).digest('hex'),
        "meetingTitle": scrumBody.meetingTitle,
        "totalTime": parseInt(scrumBody.minutesPerGuest) * scrumBody.guests.length,
        "minutesPerGuest": scrumBody.minutesPerGuest,
        "isCountdown": scrumBody.isCountdown,
        "guests": scrumBody.guests
    }
    scrumMeetings.push(newScrum);

    return newScrum.id;
}

module.exports = scrumRepo;