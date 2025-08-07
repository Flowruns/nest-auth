import { UserRole } from "./enum/UserRole";

export interface IUserDB {
    userId: string;
    name: string;
    password?: string;
    surname: string | null;
    role: UserRole;
}
