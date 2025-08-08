import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../../../entitiesPG";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(":id")
    findOne(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
        return this.userService.findOneById(id);
    }

    @Delete(":id")
    remove(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
        return this.userService.remove(id);
    }
}
