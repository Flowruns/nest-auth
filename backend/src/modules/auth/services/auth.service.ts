import { Injectable, UnauthorizedException, Inject, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginDto } from "../dto";
import { IUserServiceToken, type IUserService } from "../../../interfaces/user.service.interface";
import { CreateUserRequestDto, UserResponseDto } from '../../user/dto';
import { User } from "../../../entitiesPG";

@Injectable()
export class AuthService {
    @Inject(IUserServiceToken)
    private readonly usersService: IUserService;

    @Inject(JwtService)
    private readonly jwtService: JwtService;

    constructor() {}

    async register(createUserDto: CreateUserRequestDto): Promise<UserResponseDto> {
        const existingUser = await this.usersService.findOneForAuth(createUserDto.login);
        if (existingUser) {
            throw new BadRequestException(`Пользователь с логином "${createUserDto.login}" уже существует`);
        }
        return await this.usersService.create(createUserDto);
    }

    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const user = await this.usersService.findOneForAuth(loginDto.login);

        if (!user) {
            throw new UnauthorizedException("Неверный логин или пароль");
        }

        const isPasswordMatching = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordMatching) {
            throw new UnauthorizedException("Неверный логин или пароль");
        }

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
