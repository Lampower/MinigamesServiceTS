import { Module } from '@nestjs/common';
import { UserModule } from './user/userModule';
import { AuthModule } from './auth/authModule';
import { CookieClickerModule } from './cookieclicker/cookieclicker.module';


@Module({
  imports: [UserModule, AuthModule, CookieClickerModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {
}
