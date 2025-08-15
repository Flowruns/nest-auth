import { IsUUID, IsString, IsEnum } from "class-validator";
import { UserRole } from "../../../interfaces/enum/UserRole";

export class UserResponseDto {
    @IsUUID()
    userId: string;

    @IsString()
    login: string;

    @IsString()
    name: string;

    @IsString()
    surName: string;

    @IsEnum(UserRole)
    role: UserRole;

    constructor(user: UserResponseDto) {
        this.userId = user.userId;
        this.login = user.login;
        this.name = user.name;
        this.surName = user.surName;
        this.role = user.role;
    }
}
