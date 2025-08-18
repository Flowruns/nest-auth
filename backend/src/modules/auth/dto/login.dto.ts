import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({ example: "userLogin", description: "Логин пользователя" })
    @IsString()
    @IsNotEmpty({ message: "Login не может быть пустым" })
    @MinLength(3, { message: "Login должен содержать не менее 3 символов" })
    login: string;

    @ApiProperty({ example: "123456", description: "Пароль (минимум 6 символов)" })
    @IsString()
    @IsNotEmpty({ message: "Пароль не может быть пустым" })
    @MinLength(6, { message: "Пароль должен содержать не менее 6 символов" })
    password: string;
}
