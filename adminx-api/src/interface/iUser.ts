import type { Request } from "express";

export interface userReq extends Request {
  user:
    | iUserPayload
    | {
        id: string;
      };
}

export interface iUserPayload {
  id?: string;
}
