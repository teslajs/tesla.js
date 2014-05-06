var socket = io.connect('http://localhost');

socket.on('info', function (data) {
  console.info('app name: ' + data.name);
  document.getElementsByClassName('app-name')[0].innerHTML = data.name;
});