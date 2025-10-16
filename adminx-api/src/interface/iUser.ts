import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

export interface iUser {
  id?: string;
  name?: string;
  email?: string;
  passwordHash?: string;
}

export interface iUserReq extends Request {
  user?: iUser;
}

export interface iUserPayload extends JwtPayload {
  id?: string;
  name?: string;
  email?: string;
  passwordHash?: string;
}
