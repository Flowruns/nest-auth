import { IsString, MinLength, IsOptional, IsEnum } from "class-validator";
import { UserRole } from "../../../interfaces/enum/UserRole";

export class CreateUserDto {
    @IsString()
    @MinLength(3, { message: "Имя должно содержать не менее 3 символов" })
    name: string;

    @IsString()
    @MinLength(6, { message: "Пароль должен содержать не менее 6 символов" })
    password: string;

    @IsString()
    @IsOptional()
    surname?: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}
