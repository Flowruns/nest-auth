import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Inject, HttpCode, HttpStatus } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserResponseDto } from "../dto/user-response.dto";
import { IUserServiceToken } from "../../../interfaces/user.service.interface";
import type { IUserService } from "../../../interfaces/user.service.interface";
import { User } from "../../../entitiesPG";

@Controller("user")
export class UserController {
    constructor(
        @Inject(IUserServiceToken)
        private readonly userService: IUserService
    ) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll(): Promise<UserResponseDto[]> {
        return this.userService.findAll();
    }

    @Get(":userId")
    findOne(@Param("userId", ParseUUIDPipe) userId: string): Promise<User | null> {
        return this.userService.findOneById(userId);
    }

    @Delete(":userId")
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param("userId", ParseUUIDPipe) userId: string): Promise<void> {
        return this.userService.remove(userId);
    }
}
