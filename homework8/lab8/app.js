const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(8080);

app.use(express.static('public'));

let clients = []

io.on('connection', (socket) => {
    console.log(`Client with id ${socket.id} connected`)
    if (clients.length === 0) {
        clients.push({
            player: socket.id,
            value: "X"
        })
    } else {
        clients.push({
            player: socket.id,
            value: "O"
        })
    }
  
    clients.push(socket.id)

    // socket.emit('message', "I'm server")

    // socket.on('new_move', (data) =>
    //     console.log('Message: ', data)
    // )

    socket.on('new_move', (data)=>{
		// pos.id = socket.id;
		io.sockets.emit("all_moves", data);
        console.log(data);
        console.log(clients);
	});

    io.sockets.emit('message', 'Message for all clients')

    socket.on('disconnect', () => {
        clients.splice(clients.indexOf(socket.id), 1)
        console.log(`Client with id ${socket.id} disconnected`)
    })
})


