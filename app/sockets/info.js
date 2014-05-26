module.exports = function (io, app) {

  io.sockets.on('connection', function (socket) {
    socket.emit('info', { name: app.site.name });
  });

};
