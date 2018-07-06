import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import session from 'express-session';

import './db';
import router from './routes/index';

const MongoDBStore = require('connect-mongodb-session')(session);

const MONGO_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds125821.mlab.com:25821/orobosa`;
const DIST_DIR = path.join(__dirname, '../dist');
const PORT = 8000;
const app = express();
const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: 'sessions',
});

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token'],
};

app.use(cors(corsOption));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'youraisemeup',
  store,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 6000000, httpOnly: true },
}));

app.use(express.static(DIST_DIR));

app.get('/', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.use('/', router);

app.listen(PORT);
