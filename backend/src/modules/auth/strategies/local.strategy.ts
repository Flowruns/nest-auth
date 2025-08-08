import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException, Inject } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserPayloadDto } from "../dto";
import { IUserServiceToken } from "../../../interfaces/user.service.interface";
import type { IUserService } from "../../../interfaces/user.service.interface";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(IUserServiceToken)
        private readonly usersService: IUserService
    ) {
        super({
            usernameField: "name",
            passwordField: "password"
        });
    }

    async validate(name: string, password: string): Promise<UserPayloadDto> {
        const user = await this.usersService.findOneForAuth(name);

        if (!user) {
            throw new UnauthorizedException("Неверные учетные данные");
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password);

        if (!isPasswordMatching) {
            throw new UnauthorizedException("Неверные учетные данные");
        }

        const payload: UserPayloadDto = {
            userId: user.userId,
            name: user.name,
            surname: user.surname,
            role: user.role
        };

        return payload;
    }
}
