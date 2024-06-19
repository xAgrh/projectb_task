import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const domainName = 'projectb';

  const options = new DocumentBuilder()
    .setTitle(domainName)
    .setDescription(`${domainName} Microservice`)
    .setVersion('0.0.1')
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`/api/${domainName}/docs`, app, document, customOptions);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();
