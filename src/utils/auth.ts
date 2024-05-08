import { Request, Response, NextFunction } from "express";

// jwt
export const authenticateAPIKey = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers["authorization"] as string;
  if (apiKey !== process.env.AUTHORIZATION) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
};

export const checkAdminRole = (req: Request, res: Response, next: NextFunction): void => {
  const userHeader = req.headers["user"];
  const user = userHeader ? JSON.parse(userHeader as string) : null;

  if (user && user.role === "admin" || req.path.startsWith('/public')) {
    // req['user'] = user;
    next();
  }
  else {
    res.status(403).json({ message: "Forbidden" });
  }
};