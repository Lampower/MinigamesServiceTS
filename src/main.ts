import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 8000
  const SWAGGER_NAME = "swaggerApi"
  const app = await NestFactory.create(AppModule);
  const text = `
    Server is running 
    http://localhost:${PORT}/
    Api docs is availible at
    http://localhost:${PORT}/${SWAGGER_NAME}
  `

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
  SwaggerModule.setup(SWAGGER_NAME, app, document);

  await app.listen(PORT, () => {
    console.log(text)
  });
}

bootstrap();
