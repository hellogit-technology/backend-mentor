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
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

declare module 'express-session' {
  interface SessionData {
    isLogged: boolean;
    role: number;
    photo: string;
    displayName: string;
    failurePath: string;
    modalAccount: string | null | undefined;
    inputShowEvent: number[];
    inputShowScores: number[];
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
import showData from './middleware/pipe/formatData';
import { clearCache } from './middleware/helpers/clearCache';
import { redirectHTTPS } from './middleware/helpers/forceHTTPS';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 8080;

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Force using https (only for deployment)
app.use(redirectHTTPS);

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

// Use proxy for express server
app.set('trust proxy', true);

// Session
app.use(
  session({
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      secure: true, // only use cookie over https (only for deployment)
      maxAge: 60000 * 60, // session expire in a hour
      httpOnly: true, // dont let browser javascript access cookie
      sameSite: 'lax' // prevent CSRF Attack
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
  express.static(path.join(__dirname, `${libraryPath}/jquery`)),
  express.static(path.join(__dirname, `${libraryPath}/flatpickr`)),
  express.static(path.join(__dirname, `${libraryPath}/chart`)),
  express.static(path.join(__dirname, `${libraryPath}/bootstrap/js`)),
  express.static(path.join(__dirname, `${libraryPath}/lodash`))
]);
app.use('/css', [express.static(path.join(__dirname, `${libraryPath}/bootstrap/css`)), express.static(path.join(__dirname, `../public/helpers`))]);
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

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
