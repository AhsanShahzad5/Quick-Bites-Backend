import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";

declare global {
  namespace Express {
    interface Request {
      userId : string;
      auth0Id : string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});

export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  //there shud be a space after bearer
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }
  
  // header looks smthing  like Bearer 84854484884 , that why qe need 1 
  const token = authorization.split(" ")[1];
  
  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    //sub holds the id of user in auth0id
    const auth0Id = decoded.sub;
    const user = await User.findOne({auth0Id});

    if(!user){
      return res.sendStatus(401);
    }
    //we pass on the info to the req.body , so it can pass on as a middleware
    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();

    next();

  } catch (error) {
    return res.sendStatus(401);
    
  }
}