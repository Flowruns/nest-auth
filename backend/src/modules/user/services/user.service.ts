import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../../entitiesPG";
import { CreateUserRequestDto, UserResponseDto } from "../dto";
import { UpdateUserDto } from "../dto";
import { UserRole } from "../../../interfaces/enum/UserRole";
import { IUserService } from "../../../interfaces/user.service.interface";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService implements IUserService {
    @InjectRepository(User)
    private readonly userRepository: Repository<User>;

    private toResponseDto(user: User): UserResponseDto {
        return {
            userId: user.userId,
            login: user.login,
            name: user.name,
            surName: user.surName,
            role: user.role,
            createdAt: user.createdAt
        };
    }

    async create(createUserDto: CreateUserRequestDto): Promise<UserResponseDto> {
        const usersCount = await this.userRepository.count();
        const userEntity = this.userRepository.create({
            ...createUserDto,
            role: usersCount !== 0 ? UserRole.User : UserRole.SuperAdmin
        });
        const savedUser = await this.userRepository.save(userEntity);
        return this.toResponseDto(savedUser);
    }

    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.userRepository.find({
            order: {
                createdAt: "DESC"
            }
        });
        return users.map((user) => this.toResponseDto(user));
    }

    async findOneByUserId(userId: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ userId });
        if (!user) throw new NotFoundException(`Пользователь с userId "${userId}" не существует`);

        return user;
    }

    async findOneForAuth(login: string): Promise<User | null> {
        return this.userRepository.createQueryBuilder("user").addSelect("user.password").where("user.login = :login", { login }).getOne();
    }

    async update(userId: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.userRepository.findOneBy({ userId });
        if (!user) throw new NotFoundException(`Пользователь с userId "${userId}" не найден`);
        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
    }

    async remove(userId: string): Promise<void> {
        const result = await this.userRepository.delete({ userId });
        if (result.affected === 0) throw new NotFoundException(`Пользователь с userId "${userId}" не найден`);
    }

    async changePassword(userId: string, currentPass: string, newPass: string): Promise<void> {
        const user = await this.userRepository
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where("user.userId = :userId", { userId })
            .getOne();

        if (!user) {
            throw new NotFoundException(`Пользователь с userId "${userId}" не найден`);
        }

        const isPasswordMatching = await bcrypt.compare(currentPass, user.password);

        if (!isPasswordMatching) {
            throw new UnauthorizedException("Неверный текущий пароль");
        }

        const hashedPassword = await bcrypt.hash(newPass, 10);

        await this.userRepository.update({ userId }, { password: hashedPassword });
    }

    async count(): Promise<number> {
        return this.userRepository.count();
    }

    async existsById(userId: string): Promise<boolean> {
        const count = await this.userRepository.countBy({ userId });
        return count > 0;
    }
}
