import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserService } from "../../user/services/user.service";
import { UserPayloadDto } from "../dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UserService) {
        super({
            usernameField: "name",
            passwordField: "password"
        });
    }

    /**
     * NestJS автоматически вызывает этот метод при использовании LocalAuthGuard.
     * @param name - Имя пользователя, полученное из тела запроса.
     * @param password - Пароль, полученный из тела запроса.
     * @returns Объект DTO с данными пользователя, если аутентификация прошла успешно.
     * @throws UnauthorizedException если учетные данные неверны.
     */
    async validate(name: string, password: string): Promise<UserPayloadDto> {
        // Изменяем тип возвращаемого значения
        const user = await this.usersService.findOneByName(name);

        if (!user) {
            throw new UnauthorizedException("Неверные учетные данные");
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password);

        if (!isPasswordMatching) {
            throw new UnauthorizedException("Неверные учетные данные");
        }

        // Создаем и возвращаем DTO вместо мутации сущности
        const payload: UserPayloadDto = {
            userId: user.userId,
            name: user.name,
            surname: user.surname,
            role: user.role
        };

        return payload;
    }
}
