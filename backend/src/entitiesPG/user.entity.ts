import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";
import * as bcrypt from "bcrypt";
import { UserRole } from "../interfaces/enum/UserRole";
import { IUserDB } from "../interfaces";

@Entity("user")
export class User extends BaseEntity implements IUserDB {
    @PrimaryGeneratedColumn("uuid")
    userId: string;

    @Column({ type: "varchar", length: 100, unique: true })
    login: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    name: string;

    @Column({ type: "varchar" })
    @Exclude()
    password: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    surName: string;

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

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
}
