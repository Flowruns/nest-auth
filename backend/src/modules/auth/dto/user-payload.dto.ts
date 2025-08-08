import { UserRole } from "../../../interfaces/enum/UserRole";

export class UserPayloadDto {
    userId: string;
    name: string;
    surname: string;
    role: UserRole;
}
