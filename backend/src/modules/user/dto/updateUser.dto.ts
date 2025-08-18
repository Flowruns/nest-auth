import { IsString, MinLength, IsOptional, IsEnum } from "class-validator";
import { UserRole } from "../../../interfaces/enum/UserRole";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({ example: "userLogin", description: "Логин пользователя" })
    @IsString()
    login: string;

    @ApiProperty({ example: "Иван", description: "Имя пользователя" })
    @IsString()
    @MinLength(3, { message: "Имя должно содержать не менее 3 символов" })
    @IsOptional()
    name?: string;

    @ApiProperty({ example: "Иванов", description: "Фамилия пользователя" })
    @IsString()
    @IsOptional()
    surName?: string;

    @ApiProperty({ example: "user", description: "Роль пользователя" })
    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}
