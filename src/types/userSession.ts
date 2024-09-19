import { Session } from "next-auth";

export interface UserSession extends Session {
  id?: string | number;
  user?: {
    id?: string | number;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}