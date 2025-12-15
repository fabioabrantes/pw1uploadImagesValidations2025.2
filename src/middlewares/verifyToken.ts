import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  console.log(header);
  if (!header) {
    res.status(401).json({ message: "token not provided" });
    return;
  }

  try {
    const [bearer, token] = header.split(" "); /* Bearer lmfsfssfmfsmfsç */
    const payload = jwt.verify(token, process.env.TOKEN_KEY!);
    req.userId = payload.sub as string;
    next();
  } catch (error) {
    res.status(401).json({ message: "token invalid" });
  }
}
