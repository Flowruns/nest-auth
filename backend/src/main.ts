import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true
        })
    );

    app.setGlobalPrefix("api");

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    const configService = app.get(ConfigService);
    const port = configService.get<number>("PORT", 3000);

    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
