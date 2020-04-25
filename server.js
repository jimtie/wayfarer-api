const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');
const app = express();

// CORS
const corsOptions = {
  origin: [`http://localhost:3000`],
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

// BodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Express Session (Authentication)
app.use(session({
  store: new MongoStore({
    url: process.env.MONGO_URI
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}));

// Morgan (logging)
app.use(morgan('tiny'));

// Routes
app.get('/', (req, res) => {
  res.sendStatus(403)
});

app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/cities', routes.cities);
app.use('/api/v1/posts', routes.posts);
app.use('/api/v1/users', routes.users);

app.listen(3001, () => {
  return console.log(`Server connected at http://localhost:3001`)
});

function serverLog(data) {
  console.log('----------');
  console.log(data);
  console.log('----------');
}
