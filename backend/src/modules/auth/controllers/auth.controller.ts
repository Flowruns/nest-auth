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

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post("register")
    register(@Body() createUserDto: CreateUserRequestDto) {
        return this.authService.register(createUserDto);
    }

    @UseGuards(AuthGuard)
    @Get("profile")
    getProfile(@Req() req: Request) {
        if (!req.user) {
            throw new UnauthorizedException();
        }
        return this.authService.getProfile(req.user);
    }
}
