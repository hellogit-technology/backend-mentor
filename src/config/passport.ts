import { Strategy } from 'passport-google-oauth20';
import { PassportStatic } from 'passport';
import mongoose from 'mongoose';
import { messageVietnamese } from '../utils/message';

const GoogleStrategy = Strategy;

export const googlePassport = (passport: PassportStatic) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, null);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!,
        callbackURL: '/auth/google/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        const accessId = process.env.ORGANIZATION_ID!;
        const organizationId = profile['_json'].hd;
        const userData = profile['_json'];
        if (organizationId === accessId) {
          done(null, userData);
        } else {
          done(null, false, { type: 'message', message: messageVietnamese.RES005 });
        }
      }
    )
  );
};
