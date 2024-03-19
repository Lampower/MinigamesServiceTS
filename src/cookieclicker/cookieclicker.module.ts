import { Module } from '@nestjs/common';
import { CookieClickerService } from './cookieclicker.service';
import { CookieClickerController } from './cookieclicker.controller';

@Module({
  providers: [CookieClickerService],
  controllers: [CookieClickerController]
})
export class CookieClickerModule {}
