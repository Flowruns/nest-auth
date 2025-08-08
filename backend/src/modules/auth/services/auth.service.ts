import { Injectable, UnauthorizedException, OnApplicationBootstrap, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserService } from "../../user/services/user.service";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { UserRole } from "../../../interfaces/enum/UserRole";
import { LoginDto } from "../dto/login.dto";
import { UserResponseDto } from "../../user/dto/user-response.dto";

@Injectable()
export class AuthService implements OnApplicationBootstrap {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async onApplicationBootstrap() {
        const userCount = await this.usersService.count();
        if (userCount === 0) {
            this.logger.warn("База данных пуста. Первый зарегистрированный пользователь получит роль SuperAdmin.");
        }
    }

    async register(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const userCount = await this.usersService.count();

        if (userCount === 0) {
            createUserDto.role = UserRole.SuperAdmin;
            this.logger.log(`Регистрируется первый пользователь (${createUserDto.name}) с ролью SuperAdmin.`);
        }

        const newUser = await this.usersService.create(createUserDto);

        // Удаляем свойство password прямо из экземпляра сущности
        const { password, ...result } = newUser;

        return result;
    }

    async login(loginDto: LoginDto): Promise<{ access_token: string }> {
        const user = await this.usersService.findOneByName(loginDto.name);

        if (!user) {
            throw new UnauthorizedException("Неверные учетные данные");
        }

        const isPasswordMatching = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordMatching) {
            throw new UnauthorizedException("Неверные учетные данные");
        }

        const payload = { userId: user.userId, name: user.name, role: user.role };

        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
