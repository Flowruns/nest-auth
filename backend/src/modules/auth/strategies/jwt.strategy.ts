import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UserPayloadDto } from "../dto/user-payload.dto";
import { UserService } from "../../user/services/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UserService
    ) {
        const secret = configService.get<string>("JWT_SECRET");

        // Добавляем проверку-предохранитель.
        if (!secret) {
            throw new InternalServerErrorException("Секрет JWT не найден в конфигурации.");
        }

        // Передаем в super() переменную, тип которой теперь точно `string`
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret
        });
    }

    async validate(payload: UserPayloadDto): Promise<UserPayloadDto> {
        const userExists = await this.usersService.existsById(payload.userId);

        if (!userExists) {
            throw new UnauthorizedException("Пользователь, связанный с этим токеном, больше не существует.");
        }

        return payload;
    }
}
