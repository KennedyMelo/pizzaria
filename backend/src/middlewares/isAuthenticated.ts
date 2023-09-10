import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload{
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
){

  // get token
  const authToken = req.headers.authorization;

  if(!authToken){
    return res.status(401).end();
  }
  
  const [, token] = authToken.split(" ");

  try{
    // validate this token
    const { sub } = verify(
      token,
      process.env.JWT_SECRET
    ) as Payload;
    
    //To Recover the token id and set in req as user_id.
    req.user_id = sub;
    
    return next();

  } catch(err){
    return res.status(401).end();
  }
}