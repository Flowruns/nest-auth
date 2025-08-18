import { IsUUID, IsString, IsEnum, IsDate } from 'class-validator';
import { UserRole } from "../../../interfaces/enum/UserRole";
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UserResponseDto {
    @ApiProperty({ example: "string", description: "userId пользователя" })
    @IsUUID()
    userId: string;

    @ApiProperty({ example: "userLogin", description: "Логин пользователя" })
    @IsString()
    login: string;

    @ApiProperty({ example: "Иван", description: "Имя пользователя" })
    @IsString()
    name: string;

    @ApiProperty({ example: "Иванов", description: "Фамилия пользователя" })
    @IsString()
    surName: string;

    @ApiProperty({ example: "user", description: "Роль пользователя" })
    @IsEnum(UserRole)
    role: UserRole;

    @ApiProperty({ description: "Дата создания пользователя" })
    @IsDate()
    @Type(() => Date)
    createdAt: Date;

    constructor(user: UserResponseDto) {
        this.userId = user.userId;
        this.login = user.login;
        this.name = user.name;
        this.surName = user.surName;
        this.role = user.role;
    }
}
