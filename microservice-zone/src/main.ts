import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Agregamos un prefix o ruta base a todas las rutas de la API. Es opcional pero buena practica
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: 'http://localhost:4200',
  });

  //Configramos las validaciones de los DTOs (Data transfer objects). Para que manden los datos correctos
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
