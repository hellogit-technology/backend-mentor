import { Strategy } from 'passport-google-oauth20';
import { PassportStatic } from 'passport';
import { ClubAccount, AdminAccount } from '../app/models';
import { messageVietnamese } from '../utils/message';
import { IAccountSession } from '../interface/ISession';

const GoogleStrategy = Strategy;

export const googlePassport = (passport: PassportStatic) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser<IAccountSession>((user, done) => {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!,
        callbackURL: '/auth/google/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        const requestEmail = profile['_json'].email;
        const adminUser = await AdminAccount.findOne({ email: requestEmail });
        const leaderUser = await ClubAccount.findOne({ email: requestEmail });

        if (adminUser) {
          let adminSession;

          if (adminUser['role'] === 0) {
            adminSession = {
              userId: adminUser['_id'],
              name: adminUser['fullname'],
              email: profile['_json'].email!,
              displayName: profile['_json'].name!,
              photo: profile['_json'].picture!,
              role: 0
            };
          } else {
            adminSession = {
              userId: adminUser['_id'],
              name: adminUser['fullname'],
              email: profile['_json'].email!,
              displayName: profile['_json'].name!,
              photo: profile['_json'].picture!,
              role: 1
            };
          }

          return done(null, adminSession);
        }

        if (leaderUser) {
          const leaderSession = {
            userId: leaderUser['_id'],
            name: leaderUser['fullname'],
            email: profile['_json'].email!,
            displayName: profile['_json'].name!,
            photo: profile['_json'].picture!,
            role: 2
          };
          return done(null, leaderSession);
        }

        return done(null, false, { type: 'message', message: messageVietnamese.RES005 });
      }
    )
  );
};
