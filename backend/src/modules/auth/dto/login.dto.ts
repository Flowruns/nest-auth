import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty({ message: "Имя пользователя не может быть пустым" })
    @MinLength(3, { message: "Имя пользователя должно содержать не менее 3 символов" })
    name: string;

    @IsString()
    @IsNotEmpty({ message: "Пароль не может быть пустым" })
    @MinLength(6, { message: "Пароль должен содержать не менее 6 символов" })
    password: string;
}
