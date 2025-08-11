import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entitiesPG";
import { UserService } from "./services";
import { UserController } from "./controllers";
import { IUserServiceToken } from "../../interfaces/user.service.interface";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [
        {
            provide: IUserServiceToken,
            useClass: UserService
        }
    ],
    exports: [IUserServiceToken]
})
export class UserModule {}
