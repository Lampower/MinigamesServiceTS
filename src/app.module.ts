import { Module } from '@nestjs/common';
import { controllers } from './controllers/controllers';
import { services } from './services/indexService';
import { modules } from './modules/modules';

@Module({
  imports: modules,
  controllers: controllers,
  providers: services,
  exports: services
})
export class AppModule {
}
