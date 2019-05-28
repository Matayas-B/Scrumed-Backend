var scrumValidator = {};

scrumValidator.isValid = function (scrum) {
    return scrum.meetingTitle.length > 5 &&
        (parseInt(scrum.minutesPerGuest) > 0) &&
        (scrum.guests.length > 2)
}

module.exports = scrumValidator;