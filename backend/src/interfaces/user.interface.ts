import { UserRole } from "./enum/UserRole";

export interface IUserDB {
    userId: string;
    name: string;
    password?: string;
    surName: string | null;
    role: UserRole;
}
