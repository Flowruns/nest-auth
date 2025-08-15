import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseUUIDPipe,
    Inject,
    HttpCode,
    HttpStatus,
    Patch,
    NotFoundException
} from "@nestjs/common";
import { ApiResponseDto, CreateUserRequestDto, UpdateUserDto } from "../dto";
import { UserResponseDto } from "../dto";
import { IUserServiceToken } from "../../../interfaces/user.service.interface";
import type { IUserService } from "../../../interfaces/user.service.interface";

@Controller("users")
export class UserController {
    constructor(
        @Inject(IUserServiceToken)
        private readonly userService: IUserService
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserRequestDto): Promise<ApiResponseDto<UserResponseDto>> {
        const userDto = await this.userService.create(createUserDto);
        return {
            success: true,
            message: "User created successfully",
            data: userDto
        };
    }

    @Get()
    async findAll(): Promise<ApiResponseDto<UserResponseDto[]>> {
        const usersDto = await this.userService.findAll();
        return {
            success: true,
            message: "Users retrieved successfully",
            data: usersDto
        };
    }

    @Get(":userId")
    async findOne(@Param("userId", ParseUUIDPipe) userId: string): Promise<ApiResponseDto<UserResponseDto>> {
        const userDto = await this.userService.findOneByUserId(userId);

        if (!userDto) {
            throw new NotFoundException(`Пользователь с userId "${userId}" не найден`);
        }

        return {
            success: true,
            data: userDto
        };
    }

    @Patch(":userId")
    async update(
        @Param("userId", ParseUUIDPipe) userId: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<ApiResponseDto<UserResponseDto>> {
        const updatedUserDto = await this.userService.update(userId, updateUserDto);
        return {
            success: true,
            message: "User updated successfully",
            data: updatedUserDto
        };
    }

    @Delete(":userId")
    @HttpCode(HttpStatus.OK)
    async remove(@Param("userId", ParseUUIDPipe) userId: string): Promise<ApiResponseDto<null>> {
        await this.userService.remove(userId);
        return {
            success: true,
            message: "User deleted successfully"
        };
    }
}
