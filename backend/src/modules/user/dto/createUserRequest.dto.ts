import { IsString, MinLength, IsOptional, IsEnum } from "class-validator";
import { UserRole } from "../../../interfaces/enum/UserRole";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRequestDto {
    @ApiProperty({ example: "Иван", description: "Имя пользователя" })
    @IsOptional()
    @IsString()
    @MinLength(3, { message: "Имя должно содержать не менее 3 символов" })
    name: string;

    @ApiProperty({ example: "userLogin", description: "Логин пользователя" })
    @IsString()
    @MinLength(3, { message: "Login должен содержать не менее 3 символов" })
    login: string;

    @ApiProperty({ example: "123456", description: "Пароль (минимум 6 символов)" })
    @IsString()
    @MinLength(6, { message: "Пароль должен содержать не менее 6 символов" })
    password: string;

    @ApiProperty({ example: "Иванов", description: "Фамилия пользователя" })
    @IsString()
    @IsOptional()
    surName: string;

    @ApiProperty({ example: "user", description: "Роль пользователя" })
    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}
