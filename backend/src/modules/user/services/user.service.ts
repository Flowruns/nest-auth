import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../../entitiesPG";
import { CreateUserRequestDto } from "../dto";
import { UpdateUserDto } from "../dto";
import { UserRole } from "../../../interfaces/enum/UserRole";
import { IUserService } from "../../../interfaces/user.service.interface";

@Injectable()
export class UserService implements IUserService {
    @InjectRepository(User)
    private readonly userRepository: Repository<User>;

    async create(createUserDto: CreateUserRequestDto): Promise<User> {
        const usersCount = await this.userRepository.count();
        const user = this.userRepository.create({
            ...createUserDto,
            role: usersCount !== 0 ? UserRole.User : UserRole.SuperAdmin
        });
        return this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOneByUserId(userId: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ userId });
        if (!user) throw new NotFoundException(`Пользователь с userId "${userId}" не существует`);

        return user;
    }

    async findOneForAuth(login: string): Promise<User | null> {
        return this.userRepository
          .createQueryBuilder("user")
          .addSelect("user.password")
          .where("user.login = :login", { login })
          .getOne();
    }

    async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOneBy({ userId });
        if (!user) throw new NotFoundException(`Пользователь с userId "${userId}" не найден`);
        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
    }

    async remove(userId: string): Promise<void> {
        const result = await this.userRepository.delete({ userId });
        if (result.affected === 0) throw new NotFoundException(`Пользователь с userId "${userId}" не найден`);
    }

    async count(): Promise<number> {
        return this.userRepository.count();
    }

    async existsById(userId: string): Promise<boolean> {
        const count = await this.userRepository.countBy({ userId });
        return count > 0;
    }
}
