import { Injectable, InternalServerErrorException, UnauthorizedException, Inject } from "@nestjs/common"; // 1. Добавьте Inject
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UserPayloadDto } from "../dto";
import { IUserServiceToken } from "../../../interfaces/user.service.interface";
import type { IUserService } from "../../../interfaces/user.service.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        @Inject(IUserServiceToken) private readonly usersService: IUserService
    ) {
        const secret = configService.get<string>("JWT_SECRET");

        if (!secret) {
            throw new InternalServerErrorException("Секрет JWT не найден в конфигурации.");
        }

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
