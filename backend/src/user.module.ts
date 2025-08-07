import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entitiesPG/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [
        /* UsersController */
    ],
    providers: [
        /* UsersService */
    ]
})
export class UserModule {}
