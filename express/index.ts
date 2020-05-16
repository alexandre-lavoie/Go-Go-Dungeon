import { Server } from 'http';
import express from 'express';
import socketio from 'socket.io';
import fs from 'fs';

const app = express();
const server = new Server(app);
export const io = socketio(server);
const port = 80;

console.log(`Server started on http://localhost`);

// Express

server.listen(port);

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
    res.render('index', {'js': fs.readFileSync('./build/game/index.min.js')});
});