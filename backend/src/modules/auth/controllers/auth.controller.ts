import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "../services";
import { LoginDto } from "../dto";
import { CreateUserRequestDto } from "../../user/dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post("register")
    register(@Body() createUserDto: CreateUserRequestDto) {
        return this.authService.register(createUserDto);
    }
}
