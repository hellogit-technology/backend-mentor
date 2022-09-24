import express, { Request, Response, NextFunction } from 'express';

// Configuration Session
declare module 'express-session' {
  interface Session {
    logged?: boolean;
    role?: string;
    accountId?: string;
    username?: string;
  }
}
