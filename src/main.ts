import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors:true });

  mongoose
    .connect('mongodb+srv://kunlatek:Kunlatek751@cluster0.b0pfr.mongodb.net/desafio-v1')
    .then(() => console.info('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

  const config = new DocumentBuilder()
    .setTitle('Desafio API')
    .setDescription('Desafio API documentation')
    .setVersion('1.0')
    .addTag('api')
	.addBearerAuth()
	.setExternalDoc('Postman Collection', '/api-json')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.info(`Application is running on: ${ await app.getUrl() }`);
}
bootstrap();
