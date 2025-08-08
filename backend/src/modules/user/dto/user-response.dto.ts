import { UserRole } from "../../../interfaces/enum/UserRole";

export class UserResponseDto {
    userId: string;
    name: string;
    surname: string;
    role: UserRole;
}
