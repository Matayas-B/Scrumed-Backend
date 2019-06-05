var scrumRepo = require('../repositories/scrum_repository');

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('Participant entered scrum!');

        socket.on('changeActiveGuestTurn', function (scrumId) {
            var nextGuest = scrumRepo.changeActiveGuestTurn(scrumId);

            io.sockets.emit('nextGuestChanged', {
                nextGuest: nextGuest,
                isRunning: false,
                isFinished: nextGuest === undefined
            })
        });

        socket.on('getScrumState', function (data) {
            // TODO: DO THIS when the scrum starts, first time only.
            scrumRepo.initializeScrum(data.scrumId);

            io.sockets.emit('scrumStateChanged', {
                isPaused: data.isPaused,
                minutes: data.minutes,
                seconds: data.seconds
            })
        })

        socket.on('getUpdatedScrumState', function (scrumId) {
            socket.broadcast.emit('shareCurrentScrumState', scrumId);
        });

        socket.on('disconnect', () => {
            console.log('Participant disconnected!');
        })
    });
};