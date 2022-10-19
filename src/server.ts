import express from 'express';
import path from 'path';
import morgan from 'morgan';
import compression from 'compression';
import session from 'express-session';
import expressLayouts from 'express-ejs-layouts';
import flash from 'connect-flash';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import passport from 'passport';
import fs from 'fs-extra';
import minifyHTML from 'express-minify-html-terser';
import methodOverride from 'method-override';
import dotenv from 'dotenv';

declare module 'express-session' {
  interface SessionData {
    isLogged: boolean;
    role: number;
    photo: string;
    displayName: string;
    failurePath: string;
    modalAccount: string | null | undefined;
    inputShowEvent: number[]
    inputShowScores: number[]
  }
}

// Checking if .env file is available
if (fs.existsSync('.env')) {
  dotenv.config();
} else {
  console.error('.env file not found.');
}

import { sessionStore } from './config/sessionStore';
import route from './routes';
import { connectDB } from './config/mongodb';
import { googlePassport } from './config/passport';
import showData from './middleware/helpers';
import { clearCache } from './middleware/clearCache';

const app = express();
const port = process.env.PORT || 8080;

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Caching disabled for every route
app.use(clearCache);

// Secure
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'img-src': ["'self'", 'https: data: blob:']
    }
  })
);

// Session
app.use(
  session({
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
      maxAge: 60000 * 60, //? Session expire in 1 hours
      httpOnly: process.env.NODE_ENV === 'production' ? true : false
    },
    store: sessionStore
  })
);

// Override
app.use(methodOverride('_method'));

// Helpers
app.use(showData);

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
const libraryPath = '../public/lib';
app.use('/js', [
  express.static(path.join(__dirname, `${libraryPath}/jquery-validate`)),
  express.static(path.join(__dirname, `${libraryPath}/jquery-easing`)),
  express.static(path.join(__dirname, `${libraryPath}/jquery`)),
  express.static(path.join(__dirname, `${libraryPath}/gsap`)),
  express.static(path.join(__dirname, `${libraryPath}/flatpickr`)),
  express.static(path.join(__dirname, `${libraryPath}/chart`)),
  express.static(path.join(__dirname, `${libraryPath}/bootstrap/js`)),
  express.static(path.join(__dirname, `${libraryPath}/google`))
]);
app.use('/css', [
  express.static(path.join(__dirname, `${libraryPath}/bootstrap/css`)),
  express.static(path.join(__dirname, `../public/helpers`))
]);
app.use(express.static(path.join(__dirname, '../public')));
app.use(favicon(path.join(__dirname, '../public', 'img/favicon.png')));

// Flash
app.use(flash());

// Passport
googlePassport(passport);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Template Engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Minify HTML output
app.use(
  minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true
    }
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Route Init
route(app);

// Connect db
connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
