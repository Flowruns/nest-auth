import { IsString, MinLength, IsOptional, IsEnum } from "class-validator";
import { UserRole } from "../../../interfaces/enum/UserRole";

export class UpdateUserDto {
    @IsString()
    @MinLength(3, { message: "Имя должно содержать не менее 3 символов" })
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    surname?: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}
