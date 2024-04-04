import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 8000
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle("MinigamesService")
  .setDescription("Desc")
  .addBearerAuth({
    type: "apiKey",
    name: "Authorization",
    in: "header",
    description: "Enter the token with the `Bearer: ` prefix, e.g. 'Bearer abcde12345'"
  })
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swaggerApi", app, document);

  await app.listen(PORT, () => {
    console.log(`server port is ${PORT}`)
  });
}

bootstrap();
