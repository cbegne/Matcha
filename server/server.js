import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import moment from 'moment';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';
import socketIo from 'socket.io';
import socketioJwt from 'socketio-jwt';
import randtoken from 'rand-token';

import routes from './routes.js';
import Mongo from './config/MongoConnection.js';
import socket from './socketIo.js';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const users = [];
const port = 8000;

// Set date language to French
moment().locale('fr');

dotenv.config({ path: '.env' });

// Connect to Mongo Database
Mongo.connect();

// Check loggedUser tocken before connecting to socket Io
io.use(socketioJwt.authorize({
  secret: process.env.SESSION_SECRET,
  handshake: true,
}));

// Connect to socket Io
io.on('connection', socket(users));

// Authorize access to '/public/uploads' folder with a '/static' src client-side
app.use('/static', express.static(path.join(__dirname, 'public/uploads')));

// expose dist folder
app.use(express.static(path.join(__dirname, 'build'), {
  dotfiles: 'ignore',
  index: false,
}));

// Indicate storage space for pictures and changing filenames using multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${__dirname}/public/uploads`);
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + randtoken.generate(4) + '-' + Date.now() + path.extname(file.originalname).toLowerCase());
  },
});

// Create multer method to upload pictures
const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
});

// Activate logging middleware
app.use(morgan('dev'));
// Enable open access across domain-boundaries
app.use(cors());
// Parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());
// Load requests parsers
// extended false to use querystring (true, use qs)
app.use(bodyParser.urlencoded({ limit: '1mb', extended: false, parameterLimit: 5000 }));

app.use(bodyParser.json({ limit: '1mb' }));

// Load routes
routes(app, upload);

// if a request doesn't match a route, send the front app (on build)
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')));

server.listen(process.env.PORT || port);
