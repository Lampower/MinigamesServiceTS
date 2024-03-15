import { Module } from '@nestjs/common';
import { controllers } from './controllers/indexController';
import { services } from './services/indexService';

@Module({
  imports: [],
  controllers: controllers,
  providers: services,
})
export class AppModule {}
