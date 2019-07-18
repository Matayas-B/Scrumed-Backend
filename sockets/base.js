var scrumRepo = require('../repositories/scrum_repository');
var url = require('url');

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('Participant entered scrum!');

        var scrumIdPath = url.parse(socket.handshake.headers.referer).path;
        var scrumId = scrumIdPath.split('/')[2];
        socket.join(scrumId);
        if (socket.adapter.rooms[scrumId].length === 1) {
            scrumRepo.initializeScrum(scrumId);
        }

        socket.on('changeActiveGuestTurn', function (scrumId) {
            var nextGuest = scrumRepo.changeActiveGuestTurn(scrumId);

            io.to(scrumId).emit('nextGuestChanged', {
                nextGuest: nextGuest,
                isRunning: false,
                isFinished: nextGuest === undefined
            })
        });

        socket.on('getScrumState', function (data) {
            io.to(scrumId).emit('scrumStateChanged', {
                isPaused: data.isPaused,
                minutes: data.minutes,
                seconds: data.seconds
            })
        })

        socket.on('getUpdatedScrumState', function (scrumId) {
            socket.broadcast.to(scrumId).emit('shareCurrentScrumState', scrumId);
        });

        socket.on('disconnect', () => {
            console.log('Participant disconnected!');
        })
    });
};