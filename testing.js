var crypto = require('crypto');

var testString = 'hash 2';
var hash = crypto.createHash('md5').update(testString).digest('hex');
console.log(hash);

var scrumMeetings = [
    {
        "id": 2
    },
    {
        "id": 15
    },
    {
        "id": 3
    }
]

findNextId = function () {
    Math.max.apply(Math, scrumMeetings.map(function(scrum) { return parseInt(scrum.id); }))
}

// console.log(Math.max(...scrumMeetings.map(scrum => scrum.id)));

// console.log(("meetingTitle").length > 5);
