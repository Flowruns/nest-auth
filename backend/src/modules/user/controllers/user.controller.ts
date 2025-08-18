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
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@ApiBearerAuth()
@Controller("users")
export class UserController {
    constructor(
        @Inject(IUserServiceToken)
        private readonly userService: IUserService
    ) {}

    @Post()
    @ApiOperation({ summary: "Создание нового пользователя" })
    @ApiResponse({ status: 201, description: "Пользователь успешно создан", type: UserResponseDto })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserRequestDto): Promise<ApiResponseDto<UserResponseDto>> {
        const userDto = await this.userService.create(createUserDto);
        return { success: true, message: "User created successfully", data: userDto };
    }

    @Get()
    @ApiOperation({ summary: "Получение списка всех пользователей" })
    @ApiResponse({ status: 200, description: "Список всех пользователей", type: [UserResponseDto] })
    async findAll(): Promise<ApiResponseDto<UserResponseDto[]>> {
        const usersDto = await this.userService.findAll();
        return { success: true, message: "Users retrieved successfully", data: usersDto };
    }

    @Get(":userId")
    @ApiOperation({ summary: "Получение пользователя по ID" })
    @ApiParam({ name: "userId", description: "UUID пользователя", type: "string" })
    @ApiResponse({ status: 200, description: "Данные пользователя", type: UserResponseDto })
    @ApiResponse({ status: 404, description: "Пользователь не найден" })
    async findOne(@Param("userId", ParseUUIDPipe) userId: string): Promise<ApiResponseDto<UserResponseDto>> {
        const userDto = await this.userService.findOneByUserId(userId);
        if (!userDto) {
            throw new NotFoundException(`Пользователь с userId "${userId}" не найден`);
        }
        return { success: true, data: userDto };
    }

    @Patch(":userId")
    @ApiOperation({ summary: "Обновление данных пользователя" })
    @ApiParam({ name: "userId", description: "UUID пользователя", type: "string" })
    @ApiResponse({ status: 200, description: "Пользователь успешно обновлен.", type: UserResponseDto })
    @ApiResponse({ status: 404, description: "Пользователь не найден." })
    async update(
        @Param("userId", ParseUUIDPipe) userId: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<ApiResponseDto<UserResponseDto>> {
        const updatedUserDto = await this.userService.update(userId, updateUserDto);
        return { success: true, message: "User updated successfully", data: updatedUserDto };
    }

    @Delete(":userId")
    @ApiOperation({ summary: "Удаление пользователя" })
    @ApiParam({ name: "userId", description: "UUID пользователя", type: "string" })
    @ApiResponse({ status: 200, description: "Пользователь успешно удален" })
    @ApiResponse({ status: 404, description: "Пользователь не найден" })
    @HttpCode(HttpStatus.OK)
    async remove(@Param("userId", ParseUUIDPipe) userId: string): Promise<ApiResponseDto<null>> {
        await this.userService.remove(userId);
        return { success: true, message: "User deleted successfully" };
    }
}
