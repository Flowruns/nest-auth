import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ClassSerializerInterceptor, INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

// function launchSwagger(app: INestApplication) {
//     const config = new DocumentBuilder()
//         .setTitle("pnalog API")
//         .setDescription(" ")
//         .setVersion("1.0.0")
//         .addBearerAuth()
//         .addSecurityRequirements("bearer")
//         .build();
//
//     const document = SwaggerModule.createDocument(app, config);
//     SwaggerModule.setup("api/docs", app, document);
// }

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    const configService = app.get(ConfigService);

    const port = configService.get<number>("PORT", 3000);

    // const config = new DocumentBuilder()
    //     .setTitle("Документация API")
    //     .setDescription(" ")
    //     .setVersion("1.0")
    //     .addTag("api")
    //     .build();
    //
    // const document = SwaggerModule.createDocument(app, config);
    //
    // SwaggerModule.setup("api-docs", app, document);

    await app.listen(port);
}

bootstrap();
