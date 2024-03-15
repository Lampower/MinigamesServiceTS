import { Module } from '@nestjs/common';
import { controllers } from './controllers/indexController';
import { services } from './services/indexService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { entities } from './models/models';
import { UserMigration1710489119598 } from './migrations/1710489119598-user-migration';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "superuser",
      database: "minigames",
      entities: entities
    })
  ],
  controllers: controllers,
  providers: services
})
export class AppModule {
}
