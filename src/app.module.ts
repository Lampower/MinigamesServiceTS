import { Module } from '@nestjs/common';
import { controllers } from './controllers/indexController';
import { services } from './services/indexService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './models/models';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "superuser",
      database: "minigames",
      synchronize: true,
      logging: false,
      entities: entities,
      migrations: [],
      subscribers: [],
    })
  ],
  controllers: controllers,
  providers: services
})
export class AppModule {
}
