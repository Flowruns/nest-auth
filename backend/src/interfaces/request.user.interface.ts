import { UserRole } from "./enum/UserRole";

export interface TokenPayload {
    userId: string;
    role: UserRole;
    name: string;
    surName: string;
}
