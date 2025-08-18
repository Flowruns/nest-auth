import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entitiesPG";
import { UserService } from "./services";
import { UserController } from "./controllers";
import { IUserServiceToken } from "../../interfaces/user.service.interface";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => AuthModule)
    ],
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