import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../../entitiesPG";
import { CreateUserDto } from "../dto";
import { UpdateUserDto } from "../dto";
import { UserRole } from "../../../interfaces/enum/UserRole";
import { UserResponseDto } from "../dto";
import { IUserService } from "../../../interfaces/user.service.interface";

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    public mapEntityToDto(user: User): UserResponseDto {
        return {
            userId: user.userId,
            name: user.name,
            surName: user.surname,
            role: user.role
        };
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        let user: User;

        const usersCount = await this.userRepository.count();
        if (usersCount === 0) {
            user = this.userRepository.create({
                ...createUserDto,
                role: UserRole.SuperAdmin
            });
        } else {
            user = this.userRepository.create({
                ...createUserDto,
                role: UserRole.User
            });
        }
        return this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOneById(userId: string): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ userId });
        if (!user) {
            throw new NotFoundException(`Пользователь с айди "${userId}" не существует`);
        }
        return user;
    }

    async findOneForAuth(name: string): Promise<User | null> {
        return this.userRepository.createQueryBuilder("user").where("user.name = :name", { name }).addSelect("user.password").getOne();
    }

    async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOneBy({ userId });
        if (!user) {
            throw new NotFoundException(`Пользователь с ID "${userId}" не найден`);
        }
        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
    }

    async remove(userId: string): Promise<void> {
        const result = await this.userRepository.delete({ userId });
        if (result.affected === 0) {
            throw new NotFoundException(`Пользователь с ID "${userId}" не найден`);
        }
    }

    async count(): Promise<number> {
        return this.userRepository.count();
    }

    async existsById(userId: string): Promise<boolean> {
        const count = await this.userRepository.countBy({ userId });
        return count > 0;
    }
}
