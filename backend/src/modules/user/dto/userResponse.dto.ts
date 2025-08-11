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
}
