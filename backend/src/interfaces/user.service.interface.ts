import { CreateUserDto, UpdateUserDto, UserResponseDto } from "../modules/user/dto";
import { User } from "../entitiesPG";

// Токен для внедрения зависимости остается без изменений
export const IUserServiceToken = "IUserService";

export interface IUserService {
    /**
     * Создает нового пользователя.
     * Возвращает полную сущность User, чтобы другие сервисы могли с ней работать.
     * @param createUserDto - DTO с данными для создания.
     * @returns Promise<User> - Полная сущность созданного пользователя.
     */
    create(createUserDto: CreateUserDto): Promise<User>;

    /**
     * Находит всех пользователей.
     * Возвращает массив полных сущностей User.
     * @returns Promise<User[]> - Массив полных сущностей пользователей.
     */
    findAll(): Promise<User[]>;

    /**
     * Находит одного пользователя по его ID.
     * Возвращает полную сущность или null, если пользователь не найден.
     * @param userId - ID пользователя.
     * @returns Promise<User | null> - Сущность пользователя или null.
     */
    findOneById(userId: string): Promise<User | null>;

    /**
     * Специализированный метод для поиска пользователя при аутентификации.
     * Важно, чтобы этот метод возвращал сущность с полем password.
     * @param name - Имя пользователя (логин).
     * @returns Promise<User | null> - Сущность пользователя с паролем или null.
     */
    findOneForAuth(name: string): Promise<User | null>;

    /**
     * Обновляет данные пользователя.
     * Возвращает обновленную полную сущность User.
     * @param userId - ID пользователя для обновления.
     * @param updateUserDto - DTO с данными для обновления.
     * @returns Promise<User> - Обновленная полная сущность пользователя.
     */
    update(userId: string, updateUserDto: UpdateUserDto): Promise<User>;

    /**
     * Удаляет пользователя по его ID.
     * Возвращает void, так как после удаления возвращать нечего.
     * @param userId - ID пользователя для удаления.
     * @returns Promise<void>
     */
    remove(userId: string): Promise<void>;

    /**
     * Возвращает общее количество пользователей в системе.
     * @returns Promise<number> - Количество пользователей.
     */
    count(): Promise<number>;

    /**
     * Проверяет существование пользователя по ID.
     * @param userId - ID пользователя.
     * @returns Promise<boolean> - true, если пользователь существует.
     * @note Этот метод был в вашей реализации, добавляем его в интерфейс для полноты.
     */
    existsById(userId: string): Promise<boolean>;

    /**
     * Публичный метод для преобразования сущности в безопасный DTO.
     * Контроллеры будут использовать этот метод перед отправкой ответа клиенту.
     * @param user - Полная сущность User.
     * @returns UserResponseDto - "Безопасный" DTO без чувствительных данных.
     */
    mapEntityToDto(user: User): UserResponseDto;
}
