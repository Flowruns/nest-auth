import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entitiesPG";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
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
