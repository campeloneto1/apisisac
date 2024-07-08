import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://192.168.0.14:4200',
      'http://10.9.8.59:8080',
      'http://localhost:8080'
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  });
  await app.listen(process.env.SERV_PORT);
}
bootstrap();
