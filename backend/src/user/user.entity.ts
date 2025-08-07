import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { Exclude } from "class-transformer"; // ИСПРАВЛЕНИЕ 1: Импорт декоратора
import * as bcrypt from "bcrypt";
import { UserRole } from "./enum/UserRole";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn("uuid")
    userId: string;

    @Column({ type: "varchar", length: 100, unique: true })
    name: string;

    @Column({ type: "varchar" })
    @Exclude()
    password: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    surname: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.User
    })
    role: UserRole;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
