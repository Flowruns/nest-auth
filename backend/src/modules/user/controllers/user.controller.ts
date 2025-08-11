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
    NotFoundException,
    Patch
} from "@nestjs/common";
import { ApiResponseDto, CreateUserRequestDto, UpdateUserDto } from "../dto";
import { UserResponseDto } from "../dto";
import { IUserServiceToken } from "../../../interfaces/user.service.interface";
import type { IUserService } from "../../../interfaces/user.service.interface";

@Controller("user")
export class UserController {
    constructor(
        @Inject(IUserServiceToken)
        private readonly userService: IUserService
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserRequestDto): Promise<ApiResponseDto<UserResponseDto>> {
        const user = await this.userService.create(createUserDto);
        return {
            success: true,
            message: "User created successfully",
            data: user
        };
    }

    @Get()
    async findAll(): Promise<ApiResponseDto<UserResponseDto[]>> {
        const users = await this.userService.findAll();
        return {
            success: true,
            message: "Users retrieved successfully",
            data: users
        };
    }

    @Get(":userId")
    async findOne(@Param("userId", ParseUUIDPipe) userId: string): Promise<Promise<UserResponseDto> | null> {
        return this.userService.findOneByUserId(userId);
    }

    @Patch(":userId")
    async update(
        @Param("userId", ParseUUIDPipe) userId: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<ApiResponseDto<UserResponseDto>> {
        const updatedUser = await this.userService.update(userId, updateUserDto);
        if (!updatedUser) {
            throw new NotFoundException(`Пользователь с userId ${userId} не найден`);
        }
        return {
            success: true,
            message: "User updated successfully",
            data: updatedUser
        };
    }

    @Delete(":userId")
    @HttpCode(HttpStatus.OK)
    async remove(@Param("userId", ParseUUIDPipe) userId: string): Promise<ApiResponseDto<null>> {
        await this.userService.remove(userId);
        return {
            success: true
        };
    }
}
