import { Request, Response, NextFunction } from 'express';
import { RateLimiterMongo, RateLimiterRes, IRateLimiterMongoOptions } from 'rate-limiter-flexible';
import { messageVietnamese } from '../../utils/message';
import mongoose from 'mongoose';

export interface LimitConnfiguration {
  request: number, 
  time: number
}

class Guard {

  public validationParameter(req: Request, res: Response, next: NextFunction) {
    const regex = /^[a-z0-9]+$/;
    const limitLength = 24;
    const param = req.params.id;
    if (regex.test(param)) return next();
    if (param.length === limitLength) return next();
    req.flash('result', 'failed');
    req.flash('message', messageVietnamese.RES006);
    res.redirect('back');
  }

  private isRateLimitRes(object: unknown): object is RateLimiterRes {
    if(object !== null && typeof object === 'object') {
      return 'remainingPoints' in object
    }
    return false
  }

  public rateLimitation(config: LimitConnfiguration, serviceName: 'post' | 'patch' | 'delete' | 'other') {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { headers } = req;
        const ip = headers['CF-Connecting-IP'] || req.ip; // CF-Connecting-IP is to get the client ip from cloudflare            
        const opts: IRateLimiterMongoOptions = {
          storeClient: mongoose.connection,
          points: config.request, // Number of request
          duration: config.time // Per seconds(s)
        };
        const rateLimiterMongo = new RateLimiterMongo(opts);
        const rateLimiterRes = await rateLimiterMongo.consume(`${serviceName}:${ip}`, 1);
        res.set({ 'X-RateLimit-Remaining': rateLimiterRes.remainingPoints });
        return next();
      } catch (rateLimiterRes) {
        if(this.isRateLimitRes(rateLimiterRes)) {
          req.flash('result', 'failed');
          req.flash('message', messageVietnamese.RES006);
          res.set({ 'X-RateLimit-Remaining': rateLimiterRes.remainingPoints });
          res.redirect('back')
        }
      }
    }
  }
}

export default new Guard


