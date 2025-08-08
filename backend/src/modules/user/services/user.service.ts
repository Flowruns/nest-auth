import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { User } from "../../../entitiesPG";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserRole } from "../../../interfaces/enum/UserRole";

@Injectable()
export class UserService {
    constructor() {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await User.findOne({ where: { name: createUserDto.name } });
        if (existingUser) throw new ConflictException("Пользователь с таким именем уже существует");

        let user: User;

        const usersCount = await User.count();

        if (usersCount === 0) {
            user = User.create({
                ...createUserDto,
                role: UserRole.SuperAdmin
            });
        } else {
            user = User.create({
                ...createUserDto,
                role: UserRole.User
            });
        }

        await user.save();

        return user;
    }

    async findAll(): Promise<User[]> {
        return User.find();
    }

    /**
     * Проверяет существование пользователя по ID.
     * @param userId ID пользователя для проверки.
     * @returns `true`, если пользователь существует, иначе `false`.
     */
    async existsById(userId: string): Promise<boolean> {
        const count = await User.countBy({ userId });
        return count > 0;
    }

    // Метод для поиска пользователя по ID
    async findOneById(userId: string): Promise<User> {
        const user = await User.findOneBy({ userId });
        if (!user) {
            throw new NotFoundException(`Пользователь с ID "${userId}" не найден`);
        }
        return user;
    }

    // Метод для поиска пользователя по имени (для логина)
    async findOneByName(name: string): Promise<User | null> {
        return User.findOne({ where: { name } });
    }

    // Метод для обновления данных пользователя
    async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
        // Сначала находим пользователя, чтобы TypeORM мог отслеживать изменения
        const user = await this.findOneById(userId);

        // Проверяем, не пытается ли пользователь сменить имя на уже занятое
        if (updateUserDto.name && updateUserDto.name !== user.name) {
            const existingUser = await User.findOne({ where: { name: updateUserDto.name } });
            if (existingUser) {
                throw new ConflictException("Пользователь с таким именем уже существует");
            }
        }

        // Обновляем поля пользователя данными из DTO
        Object.assign(user, updateUserDto);

        // Сохраняем обновленную сущность
        await user.save();
        return user;
    }

    // Метод для удаления пользователя
    async remove(userId: string): Promise<void> {
        const result = await User.delete(userId);

        if (result.affected === 0) {
            throw new NotFoundException(`Пользователь с ID "${userId}" не найден`);
        }
    }

    // Метод для подсчета пользователей
    async count(): Promise<number> {
        return User.count();
    }
}
