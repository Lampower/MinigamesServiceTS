import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 1000
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle("MinigamesService")
  .setDescription("Desc")
  .addBasicAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swaggerApi", app, document);

  await app.listen(PORT, () => {
    console.log(`server port is ${PORT}`)
  });
}

bootstrap();
