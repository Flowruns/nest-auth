import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ClassSerializerInterceptor } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Включаем глобальный интерцептор для работы @Exclude() и @Expose()
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    await app.listen(3000);
}

bootstrap();
