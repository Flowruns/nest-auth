import { User } from "../../entitiesPG/user.entity";

// Расширяем существующий модуль 'express'
declare module "express" {
    // Мы добавляем новое свойство 'user' в интерфейс Request
    export interface Request {
        // Указываем, что user может быть либо вашей полной сущностью User, либо undefined
        user?: User;
    }
}
