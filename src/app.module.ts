import { Module } from '@nestjs/common';
import { UserModule } from './user/userModule';
import { AuthModule } from './auth/authModule';


@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {
}
