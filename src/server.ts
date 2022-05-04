import express from 'express';
import path from 'path';
import morgan from 'morgan';
import compression from 'compression';
import methodOverride from 'method-override';
import session from 'express-session';
import expressLayouts from 'express-ejs-layouts';
import flash from 'connect-flash';

import {sessionStore} from './config/sessionStore'
import route from './routes';
import { connectDB } from './config/mongodb';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 8080;

// Logger
app.use(morgan('dev'));

// Session
app.use(
  session({
    name: 'access-token',
    secret: process.env.SECRET_KEY || 'This is a secret key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 30 //? Session expire in 30 minutes
    },
    store: sessionStore
  })
);

// Flash
app.use(flash());

// Override
app.use(methodOverride('_method'));

// Gzip
app.use(
  compression({
    level: 6,
    threshold: 10 * 1000,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      } else {
        return compression.filter(req, res);
      }
    }
  })
);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Template Engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Route Init
route(app);

// Connect db
connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
