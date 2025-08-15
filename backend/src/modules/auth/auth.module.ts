import { Module } from "@nestjs/common";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { UserModule } from "../user/user.module";
import { AuthController } from "./controllers";
import { AuthService } from "./services";
import { AuthGuard } from './guards/auth.guard';

@Module({
    controllers: [AuthController],
    exports: [AuthService, AuthGuard],
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: {
                    expiresIn: configService.get<string>("JWT_ACCESS_EXPIRES_IN")
                }
            })
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, AuthGuard]
})
export class AuthModule {}
