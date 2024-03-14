import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { controllers } from './controllers/app.controller.index';

@Module({
  imports: [],
  // controllers: [AppController, UserController],
  controllers: controllers,
  providers: [AppService],
})
export class AppModule {}
