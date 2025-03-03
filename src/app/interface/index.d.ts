import { JwtPayload } from 'jsonwebtoken';
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export interface DecodedToken {
  email: string;
  id: string;
  exp: number;
  [key: string]: any; // If there are additional fields
}
