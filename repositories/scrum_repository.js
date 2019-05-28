var scrumRepo = {};

var scrumMeetings = [
    {
        "id": 2,
        "meetingTitle": "REPOSITORY TEST",
        "totalTime": new Date(2019, 1, 15, 0, 11, 0),
        "minutesPerGuest": 10,
        "guests": []
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
        "id": findNextId(),
        "meetingTitle": scrumBody.meetingTitle,
        "totalTime": new Date(2019, 1, 15, 0, 11, 0),
        "minutesPerGuest": scrumBody.minutesPerGuest,
        "guests": scrumBody.guests
    }
    scrumMeetings.push(newScrum);

    return newScrum.id;
}

/*
    Aux Functions
*/
findNextId = function () {
    return Math.max(...scrumMeetings.map(scrum => scrum.id)) + 1
}

module.exports = scrumRepo;