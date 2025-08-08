import { Injectable, UnauthorizedException, OnApplicationBootstrap, Logger, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginDto } from "../dto";
import { IUserServiceToken, type IUserService } from "../../../interfaces/user.service.interface";
import { UserResponseDto } from "../../user/dto";

@Injectable()
export class AuthService implements OnApplicationBootstrap {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        @Inject(IUserServiceToken)
        private readonly usersService: IUserService,
        private readonly jwtService: JwtService
    ) {}

    async onApplicationBootstrap() {
        const userCount = await this.usersService.count();
        if (userCount === 0) {
            this.logger.warn("База данных пуста. Первый зарегистрированный пользователь получит роль SuperAdmin.");
        }
    }

    async register(loginDto: LoginDto): Promise<UserResponseDto> {
        const user = await this.usersService.findOneForAuth(loginDto.name);

        if (user) {
            const isPasswordMatching = await bcrypt.compare(loginDto.password, user.password);
            if (isPasswordMatching) {
                const { password, ...result } = user;
                return result;
            }
        }

        throw new UnauthorizedException("Неверные имя пользователя или пароль");
    }

    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const user = await this.register(loginDto);

        const payload = {
            userId: user.userId,
            name: user.name,
            role: user.role
        };

        return {
            accessToken: this.jwtService.sign(payload)
        };
    }
}
