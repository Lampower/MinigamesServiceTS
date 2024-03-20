import { Module } from '@nestjs/common';
import { CookieClickerService } from './cookieclicker.service';
import { CookieClickerController } from './cookieclicker.controller';
import { UserModule } from 'src/user/userModule';

@Module({
  imports: [UserModule],
  providers: [CookieClickerService],
  controllers: [CookieClickerController]
})
export class CookieClickerModule {}
