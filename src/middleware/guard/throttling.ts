import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redisClient from '../../config/redis';

class Throttling {

  public rateLimitation =
    (limitRequest: number = 100, time: number = 3600) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const rateLimiter = new RateLimiterRedis({
          storeClient: redisClient,
          keyPrefix: 'middleware',
          points: limitRequest, // requests
          duration: time // seconds by IP
        });
        await rateLimiter.consume(req.ip);
        return next();
      } catch (error) {
        res.status(429).json({
          status: 429,
          message: 'Too Many Requests'
        });
      }
    };
}

export default new Throttling();
