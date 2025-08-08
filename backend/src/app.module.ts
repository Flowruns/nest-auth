import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as Joi from "joi";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: "dev.env",
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().required(),
                PORT: Joi.string().required(),
                POSTGRES_HOST: Joi.string().required(),
                POSTGRES_PORT: Joi.string().required(),
                POSTGRES_DB: Joi.string().required(),
                POSTGRES_USER: Joi.string().required(),
                POSTGRES_PASSWORD: Joi.string().required(),
                JWT_SECRET: Joi.string().required()
            })
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get<string>("POSTGRES_HOST"),
                port: configService.get<number>("POSTGRES_PORT"),
                username: configService.get<string>("POSTGRES_USER"),
                password: configService.get<string>("POSTGRES_PASSWORD"),
                database: configService.get<string>("POSTGRES_DB"),
                autoLoadEntities: true,
                synchronize: true
            }),
            inject: [ConfigService]
        }),
        UserModule,
        AuthModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
