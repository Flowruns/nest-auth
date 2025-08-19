import { CreateUserRequestDto, UpdateUserDto, UserResponseDto } from "../modules/user/dto";
import { User } from "../entitiesPG";

export const IUserServiceToken = "IUserService";

export interface IUserService {
    create(createUserDto: CreateUserRequestDto): Promise<UserResponseDto>;

    findAll(): Promise<UserResponseDto[]>;

    findOneByUserId(userId: string): Promise<UserResponseDto | null>;

    findOneForAuth(login: string): Promise<User | null>;

    update(userId: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;

    remove(userId: string): Promise<{ message: string }>;

    changePassword(userId: string, currentPass: string, newPass: string): Promise<{ message: string }>;

    count(): Promise<number>;

    existsById(userId: string): Promise<boolean>;
}
