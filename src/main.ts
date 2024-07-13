import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { JwtGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  // app.useGlobalInterceptors(
  //   new ClassSerializerInterceptor(app.get(Reflector), {
  //     strategy: 'excludeAll',
  //     excludeExtraneousValues: true,
  //   }),
  // );
  app.useGlobalGuards(new JwtGuard(app.get(Reflector)));
  app.useGlobalGuards(new RolesGuard(app.get(Reflector)));
  await app.listen(6543);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
