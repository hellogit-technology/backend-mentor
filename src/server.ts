import express from 'express';
import path from 'path';
import morgan from 'morgan';
import compression from 'compression';
import methodOverride from 'method-override';
import session from 'express-session';
import expressLayouts from 'express-ejs-layouts';
import flash from 'connect-flash';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

import { sessionStore } from './config/sessionStore';
import route from './routes/v1';
import { connectDB } from './config/mongodb';

const app = express();
const port = process.env.PORT || 8080;

// Logger
app.use(morgan('dev'));

// Secure
app.use(helmet());

// Session
app.use(
  session({
    name: 'access-token',
    secret: process.env.SECRET_KEY || uuidv4(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 60000 * 60 //? Session expire in 1 hours
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

// Public
const libraryPath = '../resource/lib' 
app.use('/js', [
  express.static(path.join(__dirname, `${libraryPath}/jquery-validate`)),
  express.static(path.join(__dirname, `${libraryPath}/jquery-easing`)),
  express.static(path.join(__dirname, `${libraryPath}/jquery`)),
  express.static(path.join(__dirname, `${libraryPath}/gsap`)),
  express.static(path.join(__dirname, `${libraryPath}/flatpickr`)),
  express.static(path.join(__dirname, `${libraryPath}/chart`)),
  express.static(path.join(__dirname, `${libraryPath}/bootstrap/js`)),
])
app.use('/css', [
  express.static(path.join(__dirname, `${libraryPath}/bootstrap/css`)),
  express.static(path.join(__dirname, `${libraryPath}/font-awesome/css`))
])
app.use(express.static(path.join(__dirname, '../public')));
app.use(favicon(path.join(__dirname, '../public', 'img/club.png')));

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
