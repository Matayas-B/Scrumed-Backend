module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('Participant entered scrum!');

        socket.on('startScrum', function (data) {
            io.sockets.emit('scrumStarted', {
                scrumId: data.scrumId
            })
            // socket.emit('scrumStarted', {
            //     information: "Orchestrator ! ! !" --> This emits just for the one who calls.
            // })
        })

        socket.on('pauseScrum', function(data) {
            io.sockets.emit('scrumPaused', {
                isPaused: data.isPaused,
                minutes: data.minutes,
                seconds: data.seconds
            })
        })

        socket.on('disconnect', () => {
            console.log('Participant disconnected!');
        })
    });
};