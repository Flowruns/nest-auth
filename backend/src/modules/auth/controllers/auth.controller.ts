import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    UseGuards,
    Get,
    Req,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from "../services";
import { LoginDto } from "../dto";
import { CreateUserRequestDto } from "../../user/dto";
import { AuthGuard } from "../guards/auth.guard";
import type { Request } from "express";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: "Вход пользователя в систему" })
    @ApiResponse({ status: 200, description: "Успешный вход, возвращает токен доступа" })
    @ApiResponse({ status: 401, description: "Неверные учетные данные" })
    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @ApiOperation({ summary: "Регистрация нового пользователя" })
    @ApiResponse({ status: 201, description: "Пользователь успешно создан" })
    @ApiResponse({ status: 400, description: "Неверные данные для регистрации" })
    @HttpCode(HttpStatus.CREATED)
    @Post("register")
    register(@Body() createUserDto: CreateUserRequestDto) {
        return this.authService.register(createUserDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: "Получение профиля текущего пользователя" })
    @ApiResponse({ status: 200, description: "Данные профиля пользователя" })
    @ApiResponse({ status: 401, description: "Пользователь не авторизован" })
    @UseGuards(AuthGuard)
    @Get("profile")
    getProfile(@Req() req: Request) {
        if (!req.user) {
            throw new UnauthorizedException();
        }
        return this.authService.getProfile(req.user);
    }
}
